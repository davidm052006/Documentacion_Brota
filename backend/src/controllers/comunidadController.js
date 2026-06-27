const supabase = require('../config/supabase');

// ── Utilidades ────────────────────────────────────────────────────────────────

function timeAgo(isoDate) {
  const diff = Date.now() - new Date(isoDate).getTime();
  const min  = Math.floor(diff / 60000);
  if (min < 1)  return 'ahora mismo';
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24)   return `hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d === 1)  return 'hace 1 día';
  if (d < 7)    return `hace ${d} días`;
  const w = Math.floor(d / 7);
  if (w === 1)  return 'hace 1 semana';
  return `hace ${w} semanas`;
}

async function getNombreUsuario(userId) {
  const { data } = await supabase
    .from('perfiles_usuario')
    .select('primer_nombre, nombre')
    .eq('user_id', userId)
    .single();
  return data?.primer_nombre || data?.nombre || 'Usuario';
}

// ── FOROS ─────────────────────────────────────────────────────────────────────

const getForos = async (req, res) => {
  try {
    const { data: foros, error } = await supabase
      .from('foros')
      .select('id, icon, nombre, descripcion')
      .order('id');

    if (error) return res.status(500).json({ success: false, message: error.message });

    // Conteo de posts por foro
    const { data: conteos } = await supabase
      .from('posts_foro')
      .select('foro_id');

    const conteoPorForo = {};
    (conteos ?? []).forEach(p => {
      conteoPorForo[p.foro_id] = (conteoPorForo[p.foro_id] ?? 0) + 1;
    });

    const result = foros.map(f => ({
      ...f,
      posts:     conteoPorForo[f.id] ?? 0,
      siguiendo: 0,
    }));

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error('comunidadController.getForos:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── POSTS ─────────────────────────────────────────────────────────────────────

const getPostsByForo = async (req, res) => {
  try {
    const { id: foroId } = req.params;
    const orden = req.query.orden === 'votados' ? 'votos' : 'created_at';
    const asc   = orden === 'votos' ? false : false;

    const { data, error } = await supabase
      .from('posts_foro')
      .select('id, titulo, contenido, anonimo, autor_nombre, votos, created_at')
      .eq('foro_id', foroId)
      .order(orden, { ascending: asc })
      .limit(50);

    if (error) return res.status(500).json({ success: false, message: error.message });

    // Conteo de respuestas
    const postIds = (data ?? []).map(p => p.id);
    let conteoResp = {};
    if (postIds.length) {
      const { data: resps } = await supabase
        .from('respuestas_post')
        .select('post_id')
        .in('post_id', postIds);
      (resps ?? []).forEach(r => {
        conteoResp[r.post_id] = (conteoResp[r.post_id] ?? 0) + 1;
      });
    }

    const result = (data ?? []).map(p => ({
      id:              p.id,
      foro_id:         foroId,
      titulo:          p.titulo,
      preview:         p.contenido.slice(0, 200),
      autor_display:   p.anonimo ? 'Anónimo' : (p.autor_nombre || 'Usuario'),
      ini:             (p.anonimo ? 'A' : (p.autor_nombre || 'U').charAt(0).toUpperCase()),
      time:            timeAgo(p.created_at),
      votos:           p.votos ?? 0,
      respuestas:      conteoResp[p.id] ?? 0,
    }));

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error('comunidadController.getPostsByForo:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { id: foroId } = req.params;
    const { titulo, contenido, anonimo = false } = req.body;
    const userId = req.user.id;

    if (!titulo?.trim() || !contenido?.trim()) {
      return res.status(400).json({ success: false, message: 'Título y contenido requeridos' });
    }

    const { data: foro } = await supabase.from('foros').select('id').eq('id', foroId).single();
    if (!foro) return res.status(404).json({ success: false, message: 'Foro no encontrado' });

    const autorNombre = anonimo ? null : await getNombreUsuario(userId);

    const { data, error } = await supabase
      .from('posts_foro')
      .insert({ foro_id: foroId, user_id: userId, titulo: titulo.trim(), contenido: contenido.trim(), anonimo, autor_nombre: autorNombre })
      .select()
      .single();

    if (error) return res.status(500).json({ success: false, message: error.message });

    return res.status(201).json({ success: true, data: { ...data, autor_display: anonimo ? 'Anónimo' : autorNombre, time: 'ahora mismo', respuestas: 0 } });
  } catch (err) {
    console.error('comunidadController.createPost:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const userId = req.user?.id ?? null;

    const { data: post, error } = await supabase
      .from('posts_foro')
      .select('*, foros(id, icon, nombre)')
      .eq('id', postId)
      .single();

    if (error || !post) return res.status(404).json({ success: false, message: 'Post no encontrado' });

    const { data: respuestas } = await supabase
      .from('respuestas_post')
      .select('id, contenido, anonimo, autor_nombre, votos, es_mejor_respuesta, created_at')
      .eq('post_id', postId)
      .order('es_mejor_respuesta', { ascending: false })
      .order('votos', { ascending: false });

    let miVoto = null;
    if (userId) {
      const { data: voto } = await supabase
        .from('votos_post')
        .select('direccion')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single();
      miVoto = voto?.direccion ?? null;
    }

    return res.json({
      success: true,
      data: {
        id:            post.id,
        foro:          post.foros,
        titulo:        post.titulo,
        body:          post.contenido,
        autor_display: post.anonimo ? 'Anónimo' : (post.autor_nombre || 'Usuario'),
        ini:           (post.anonimo ? 'A' : (post.autor_nombre || 'U').charAt(0).toUpperCase()),
        time:          timeAgo(post.created_at),
        votos:         post.votos ?? 0,
        mi_voto:       miVoto,
        respuestas:    (respuestas ?? []).map(r => ({
          id:           r.id,
          texto:        r.contenido,
          autor_display: r.anonimo ? 'Anónimo' : (r.autor_nombre || 'Usuario'),
          ini:          (r.anonimo ? 'A' : (r.autor_nombre || 'U').charAt(0).toUpperCase()),
          time:         timeAgo(r.created_at),
          votos:        r.votos ?? 0,
          mejor:        r.es_mejor_respuesta ?? false,
        })),
      },
    });
  } catch (err) {
    console.error('comunidadController.getPost:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const votarPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { direccion } = req.body;
    const userId = req.user.id;

    if (!['up', 'down'].includes(direccion)) {
      return res.status(400).json({ success: false, message: 'Dirección inválida' });
    }

    const { data: postActual } = await supabase
      .from('posts_foro').select('votos').eq('id', postId).single();
    if (!postActual) return res.status(404).json({ success: false, message: 'Post no encontrado' });

    const { data: votoExistente } = await supabase
      .from('votos_post').select('id, direccion').eq('post_id', postId).eq('user_id', userId).single();

    let nuevoVotos = postActual.votos ?? 0;
    let miVoto = null;

    if (votoExistente) {
      if (votoExistente.direccion === direccion) {
        // Toggle: quitar voto
        await supabase.from('votos_post').delete().eq('id', votoExistente.id);
        nuevoVotos += direccion === 'up' ? -1 : 1;
        miVoto = null;
      } else {
        // Cambiar dirección
        await supabase.from('votos_post').update({ direccion }).eq('id', votoExistente.id);
        nuevoVotos += direccion === 'up' ? 2 : -2;
        miVoto = direccion;
      }
    } else {
      await supabase.from('votos_post').insert({ post_id: postId, user_id: userId, direccion });
      nuevoVotos += direccion === 'up' ? 1 : -1;
      miVoto = direccion;
    }

    await supabase.from('posts_foro').update({ votos: nuevoVotos }).eq('id', postId);

    return res.json({ success: true, data: { votos: nuevoVotos, mi_voto: miVoto } });
  } catch (err) {
    console.error('comunidadController.votarPost:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const responderPost = async (req, res) => {
  try {
    const { id: postId } = req.params;
    const { contenido, anonimo = false } = req.body;
    const userId = req.user.id;

    if (!contenido?.trim()) {
      return res.status(400).json({ success: false, message: 'Contenido requerido' });
    }

    const { data: post } = await supabase.from('posts_foro').select('id').eq('id', postId).single();
    if (!post) return res.status(404).json({ success: false, message: 'Post no encontrado' });

    const autorNombre = anonimo ? null : await getNombreUsuario(userId);

    const { data, error } = await supabase
      .from('respuestas_post')
      .insert({ post_id: postId, user_id: userId, contenido: contenido.trim(), anonimo, autor_nombre: autorNombre })
      .select().single();

    if (error) return res.status(500).json({ success: false, message: error.message });

    return res.status(201).json({
      success: true,
      data: {
        id:           data.id,
        texto:        data.contenido,
        autor_display: anonimo ? 'Anónimo' : autorNombre,
        ini:          (anonimo ? 'A' : (autorNombre || 'U').charAt(0).toUpperCase()),
        time:         'ahora mismo',
        votos:        0,
        mejor:        false,
      },
    });
  } catch (err) {
    console.error('comunidadController.responderPost:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── HISTORIAS ─────────────────────────────────────────────────────────────────

const getHistorias = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('historias')
      .select('id, titulo, contenido, area, carrera, institucion, anonimo, autor_nombre, likes, created_at')
      .eq('publicada', true)
      .order('created_at', { ascending: false })
      .limit(20);

    if (error) return res.status(500).json({ success: false, message: error.message });

    const userId = req.user?.id ?? null;
    let misLikes = new Set();
    if (userId && data?.length) {
      const { data: likes } = await supabase
        .from('likes_historia')
        .select('historia_id')
        .eq('user_id', userId)
        .in('historia_id', data.map(h => h.id));
      (likes ?? []).forEach(l => misLikes.add(l.historia_id));
    }

    const result = (data ?? []).map(h => ({
      id:           h.id,
      ini:          h.anonimo ? 'A' : (h.autor_nombre || 'U').charAt(0).toUpperCase(),
      name:         h.anonimo ? 'Anónimo' : (h.autor_nombre || 'Usuario'),
      carrera:      h.carrera || '',
      inst:         h.institucion || '',
      title:        h.titulo,
      excerpt:      h.contenido.slice(0, 160),
      tag:          h.area,
      likes:        h.likes ?? 0,
      yo_di_like:   misLikes.has(h.id),
      date:         timeAgo(h.created_at),
    }));

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error('comunidadController.getHistorias:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getHistoria = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id ?? null;

    const { data, error } = await supabase
      .from('historias')
      .select('*')
      .eq('id', id)
      .eq('publicada', true)
      .single();

    if (error || !data) return res.status(404).json({ success: false, message: 'Historia no encontrada' });

    let yoDiLike = false;
    if (userId) {
      const { data: like } = await supabase
        .from('likes_historia').select('id').eq('historia_id', id).eq('user_id', userId).single();
      yoDiLike = !!like;
    }

    // Historias relacionadas (misma área, sin incluir la actual)
    const { data: relacionadas } = await supabase
      .from('historias')
      .select('id, titulo, anonimo, autor_nombre, likes')
      .eq('publicada', true)
      .eq('area', data.area)
      .neq('id', id)
      .limit(4);

    return res.json({
      success: true,
      data: {
        id:           data.id,
        titulo:       data.titulo,
        area:         data.area,
        carrera:      data.carrera || '',
        inst:         data.institucion || '',
        ini:          data.anonimo ? 'A' : (data.autor_nombre || 'U').charAt(0).toUpperCase(),
        name:         data.anonimo ? 'Anónimo' : (data.autor_nombre || 'Usuario'),
        likes:        data.likes ?? 0,
        yo_di_like:   yoDiLike,
        date:         timeAgo(data.created_at),
        body:         data.contenido.split('\n\n').filter(Boolean),
        relacionadas: (relacionadas ?? []).map(r => ({
          id:    r.id,
          title: r.titulo,
          ini:   r.anonimo ? 'A' : (r.autor_nombre || 'U').charAt(0).toUpperCase(),
          name:  r.anonimo ? 'Anónimo' : (r.autor_nombre || 'Usuario'),
          likes: r.likes ?? 0,
        })),
      },
    });
  } catch (err) {
    console.error('comunidadController.getHistoria:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const crearHistoria = async (req, res) => {
  try {
    const { titulo, contenido, area, carrera, institucion, anonimo = true } = req.body;
    const userId = req.user.id;

    if (!titulo?.trim() || !contenido?.trim() || !area?.trim()) {
      return res.status(400).json({ success: false, message: 'Título, contenido y área son requeridos' });
    }

    const autorNombre = anonimo ? null : await getNombreUsuario(userId);

    const { data, error } = await supabase
      .from('historias')
      .insert({
        user_id: userId, titulo: titulo.trim(), contenido: contenido.trim(),
        area: area.trim(), carrera: carrera?.trim() || null,
        institucion: institucion?.trim() || null, anonimo, autor_nombre: autorNombre,
        publicada: false,
      })
      .select().single();

    if (error) return res.status(500).json({ success: false, message: error.message });

    return res.status(201).json({ success: true, data, message: 'Historia enviada para revisión' });
  } catch (err) {
    console.error('comunidadController.crearHistoria:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const toggleLikeHistoria = async (req, res) => {
  try {
    const { id: historiaId } = req.params;
    const userId = req.user.id;

    const { data: historia } = await supabase
      .from('historias').select('id, likes').eq('id', historiaId).single();
    if (!historia) return res.status(404).json({ success: false, message: 'Historia no encontrada' });

    const { data: like } = await supabase
      .from('likes_historia').select('id').eq('historia_id', historiaId).eq('user_id', userId).single();

    let nuevoLikes = historia.likes ?? 0;
    let yoDiLike;

    if (like) {
      await supabase.from('likes_historia').delete().eq('id', like.id);
      nuevoLikes = Math.max(0, nuevoLikes - 1);
      yoDiLike = false;
    } else {
      await supabase.from('likes_historia').insert({ historia_id: historiaId, user_id: userId });
      nuevoLikes += 1;
      yoDiLike = true;
    }

    await supabase.from('historias').update({ likes: nuevoLikes }).eq('id', historiaId);

    return res.json({ success: true, data: { likes: nuevoLikes, yo_di_like: yoDiLike } });
  } catch (err) {
    console.error('comunidadController.toggleLikeHistoria:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── PREGUNTAS ─────────────────────────────────────────────────────────────────

const getPreguntas = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('preguntas_comunidad')
      .select('id, titulo, area, anonimo, autor_nombre, resuelta, created_at')
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) return res.status(500).json({ success: false, message: error.message });

    const pregIds = (data ?? []).map(p => p.id);
    let conteoResp = {};
    if (pregIds.length) {
      const { data: resps } = await supabase
        .from('respuestas_pregunta').select('pregunta_id').in('pregunta_id', pregIds);
      (resps ?? []).forEach(r => { conteoResp[r.pregunta_id] = (conteoResp[r.pregunta_id] ?? 0) + 1; });
    }

    const result = (data ?? []).map(p => ({
      id:           p.id,
      title:        p.titulo,
      area:         p.area,
      ini:          p.anonimo ? 'A' : (p.autor_nombre || 'U').charAt(0).toUpperCase(),
      name:         p.anonimo ? 'Anónimo' : (p.autor_nombre || 'Usuario'),
      time:         timeAgo(p.created_at),
      answers:      conteoResp[p.id] ?? 0,
      resolved:     p.resuelta ?? false,
    }));

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error('comunidadController.getPreguntas:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getPregunta = async (req, res) => {
  try {
    const { id: preguntaId } = req.params;

    const { data: pregunta, error } = await supabase
      .from('preguntas_comunidad')
      .select('*')
      .eq('id', preguntaId)
      .single();

    if (error || !pregunta) return res.status(404).json({ success: false, message: 'Pregunta no encontrada' });

    const { data: respuestas } = await supabase
      .from('respuestas_pregunta')
      .select('id, contenido, anonimo, autor_nombre, votos, es_mejor, created_at')
      .eq('pregunta_id', preguntaId)
      .order('es_mejor', { ascending: false })
      .order('votos', { ascending: false });

    return res.json({
      success: true,
      data: {
        id:           pregunta.id,
        title:        pregunta.titulo,
        area:         pregunta.area,
        ini:          pregunta.anonimo ? 'A' : (pregunta.autor_nombre || 'U').charAt(0).toUpperCase(),
        name:         pregunta.anonimo ? 'Anónimo' : (pregunta.autor_nombre || 'Usuario'),
        time:         timeAgo(pregunta.created_at),
        resuelta:     pregunta.resuelta ?? false,
        es_autor:     false,
        respuestas:   (respuestas ?? []).map(r => ({
          id:           r.id,
          texto:        r.contenido,
          autor_display: r.anonimo ? 'Anónimo' : (r.autor_nombre || 'Usuario'),
          ini:          r.anonimo ? 'A' : (r.autor_nombre || 'U').charAt(0).toUpperCase(),
          time:         timeAgo(r.created_at),
          votos:        r.votos ?? 0,
          mejor:        r.es_mejor ?? false,
        })),
      },
    });
  } catch (err) {
    console.error('comunidadController.getPregunta:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const crearPregunta = async (req, res) => {
  try {
    const { titulo, area = 'General', anonimo = false } = req.body;
    const userId = req.user.id;

    if (!titulo?.trim()) {
      return res.status(400).json({ success: false, message: 'Título requerido' });
    }

    const autorNombre = anonimo ? null : await getNombreUsuario(userId);

    const { data, error } = await supabase
      .from('preguntas_comunidad')
      .insert({ user_id: userId, titulo: titulo.trim(), area: area.trim(), anonimo, autor_nombre: autorNombre })
      .select().single();

    if (error) return res.status(500).json({ success: false, message: error.message });

    return res.status(201).json({ success: true, data });
  } catch (err) {
    console.error('comunidadController.crearPregunta:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const responderPregunta = async (req, res) => {
  try {
    const { id: preguntaId } = req.params;
    const { contenido, anonimo = false } = req.body;
    const userId = req.user.id;

    if (!contenido?.trim()) {
      return res.status(400).json({ success: false, message: 'Contenido requerido' });
    }

    const { data: pregunta } = await supabase
      .from('preguntas_comunidad').select('id').eq('id', preguntaId).single();
    if (!pregunta) return res.status(404).json({ success: false, message: 'Pregunta no encontrada' });

    const autorNombre = anonimo ? null : await getNombreUsuario(userId);

    const { data, error } = await supabase
      .from('respuestas_pregunta')
      .insert({ pregunta_id: preguntaId, user_id: userId, contenido: contenido.trim(), anonimo, autor_nombre: autorNombre })
      .select().single();

    if (error) return res.status(500).json({ success: false, message: error.message });

    return res.status(201).json({
      success: true,
      data: {
        id:           data.id,
        texto:        data.contenido,
        autor_display: anonimo ? 'Anónimo' : autorNombre,
        ini:          anonimo ? 'A' : (autorNombre || 'U').charAt(0).toUpperCase(),
        time:         'ahora mismo',
        votos:        0,
        mejor:        false,
      },
    });
  } catch (err) {
    console.error('comunidadController.responderPregunta:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const marcarMejorRespuesta = async (req, res) => {
  try {
    const { id: preguntaId, rid: respuestaId } = req.params;
    const userId = req.user.id;

    const { data: pregunta } = await supabase
      .from('preguntas_comunidad').select('id, user_id').eq('id', preguntaId).single();
    if (!pregunta) return res.status(404).json({ success: false, message: 'Pregunta no encontrada' });
    if (pregunta.user_id !== userId) return res.status(403).json({ success: false, message: 'Solo el autor puede marcar la mejor respuesta' });

    // Desmarcar todas las respuestas previas
    await supabase.from('respuestas_pregunta').update({ es_mejor: false }).eq('pregunta_id', preguntaId);
    // Marcar la nueva
    await supabase.from('respuestas_pregunta').update({ es_mejor: true }).eq('id', respuestaId);
    // Marcar pregunta como resuelta
    await supabase.from('preguntas_comunidad').update({ resuelta: true }).eq('id', preguntaId);

    return res.json({ success: true });
  } catch (err) {
    console.error('comunidadController.marcarMejorRespuesta:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

// ── CONVOCATORIAS ─────────────────────────────────────────────────────────────

const getConvocatorias = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('convocatorias')
      .select('id, tipo, titulo, institucion, ciudad, fecha_cierre')
      .eq('activa', true)
      .gte('fecha_cierre', new Date().toISOString())
      .order('fecha_cierre', { ascending: true })
      .limit(20);

    if (error) return res.status(500).json({ success: false, message: error.message });

    const result = (data ?? []).map(c => ({
      id:         c.id,
      type:       c.tipo,
      title:      c.titulo,
      inst:       c.institucion,
      city:       c.ciudad,
      days:       Math.ceil((new Date(c.fecha_cierre) - Date.now()) / 86400000),
    }));

    return res.json({ success: true, data: result });
  } catch (err) {
    console.error('comunidadController.getConvocatorias:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

const getConvocatoria = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('convocatorias')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return res.status(404).json({ success: false, message: 'Convocatoria no encontrada' });

    return res.json({
      success: true,
      data: {
        id:         data.id,
        type:       data.tipo,
        title:      data.titulo,
        inst:       data.institucion,
        city:       data.ciudad,
        descripcion: data.descripcion || '',
        days:       Math.ceil((new Date(data.fecha_cierre) - Date.now()) / 86400000),
        url:        data.url || '',
        detalles:   data.detalles || {},
      },
    });
  } catch (err) {
    console.error('comunidadController.getConvocatoria:', err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  getForos, getPostsByForo, createPost, getPost, votarPost, responderPost,
  getHistorias, getHistoria, crearHistoria, toggleLikeHistoria,
  getPreguntas, getPregunta, crearPregunta, responderPregunta, marcarMejorRespuesta,
  getConvocatorias, getConvocatoria,
};
