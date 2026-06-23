'use strict';

const supabase = require('../config/supabase');

const METADATA_URL = 'https://datos.gov.co/api/views/upr9-nkiz.json';
const API_URL      = 'https://datos.gov.co/resource/upr9-nkiz.json';
const PAGE_SIZE    = 5000;

// NBC_MAP con los valores EXACTOS que devuelve la API de datos.gov.co
// (Title Case, sin comas entre grupos de palabras)
const NBC_MAP = {
  'administración':                                         'administrativo',
  'contaduría pública':                                     'negocios',
  'economía':                                               'negocios',
  'comunicación social periodismo y afines':                'comunicacion',
  'publicidad y afines':                                    'comunicacion',
  'derecho y afines':                                       'juridico',
  'formación relacionada con el campo militar o policial':  'juridico',
  'psicología':                                             'social',
  'sociología trabajo social y afines':                     'social',
  'ciencia política relaciones internacionales':            'social',
  'antropología y  artes liberales':                        'humanidades',
  'bibliotecología otros de ciencias sociales y humanas':   'humanidades',
  'geografía historia':                                     'humanidades',
  'lenguas modernas literatura linguística y afines':       'humanidades',
  'filosofía teología y afines':                            'humanidades',
  'deportes educación física y recreación':                 'deporte',
  'ingeniería de sistemas telemática y afines':             'tecnologia',
  'ingeniería electrónica telecomunicaciones y afines':     'tecnologia',
  'ingeniería eléctrica y afines':                          'tecnologia',
  'ingeniería industrial y afines':                         'tecnologia',
  'ingeniería civil y afines':                              'tecnologia',
  'ingeniería mecánica y afines':                           'tecnologia',
  'otras ingenierías':                                      'tecnologia',
  'arquitectura':                                           'diseño',
  'arquitectura y afines':                                  'diseño',
  'ingeniería ambiental sanitaria y afines':                'ambiental',
  'ingeniería agroindustrial alimentos y afines':           'ambiental',
  'ingeniería agronómica pecuaria y afines':                'ambiental',
  'ingeniería agrícola forestal y afines':                  'ambiental',
  'ingeniería de minas metalurgia y afines':                'ambiental',
  'ingeniería química y afines':                            'ciencias',
  'ingeniería biomédica y afines':                          'salud',
  'ingeniería administrativa y afines':                     'administrativo',
  'artes plásticas visuales y afines':                      'arte',
  'artes representativas':                                  'arte',
  'música':                                                 'arte',
  'otros programas asociados a bellas artes':               'arte',
  'diseño':                                                 'diseño',
  'biología microbiología y afines':                        'ciencias',
  'física':                                                 'ciencias',
  'geología otros programas de ciencias naturales':         'ciencias',
  'matemáticas estadística y afines':                       'ciencias',
  'química y afines':                                       'ciencias',
  'agronomía':                                              'ambiental',
  'medicina veterinaria':                                   'salud',
  'zootecnia':                                              'ambiental',
  'bacteriología':                                          'salud',
  'enfermería':                                             'salud',
  'instrumentación quirúrgica':                             'salud',
  'medicina':                                               'salud',
  'nutrición y dietética':                                  'salud',
  'odontología':                                            'salud',
  'optometría otros programas de ciencias de la salud':     'salud',
  'salud pública':                                          'salud',
  'terapias':                                               'salud',
  'educación':                                              'educacion',
};

// Fallback por gran área de conocimiento (nombreareaconocimiento)
const AREA_FALLBACK = {
  'ciencias de la salud':                                   'salud',
  'ciencias de la educación':                               'educacion',
  'bellas artes':                                           'arte',
  'matemáticas y ciencias naturales':                       'ciencias',
  'agronomía veterinaria y afines':                         'ambiental',
  'ingeniería arquitectura urbanismo y afines':             'tecnologia',
  'economía administración contaduría y afines':            'administrativo',
  'ciencias sociales y humanas':                            'social',
};

function getAreaAcademica(nombrenbc, nombreareaconocimiento) {
  const nbcKey = (nombrenbc ?? '').toLowerCase().trim();
  if (NBC_MAP[nbcKey]) return NBC_MAP[nbcKey];
  const areaKey = (nombreareaconocimiento ?? '').toLowerCase().trim();
  if (AREA_FALLBACK[areaKey]) return AREA_FALLBACK[areaKey];
  return null;
}

function getTipoInstitucion(caracter) {
  const c = (caracter ?? '').toLowerCase();
  if (c.includes('técnica profesional')) return 'Técnica';
  if (c.includes('tecnológica') || c.includes('escuela tecnológica')) return 'Tecnológica';
  if (c.includes('universitaria')) return 'Tecnológica';
  return 'Universidad';
}

function getTipoPrograma(nivel) {
  const n = (nivel ?? '').toLowerCase();
  if (n.includes('técnica profesional') || n.includes('técnico profesional')) return 'Técnica';
  if (n.includes('tecnológico') || n.includes('tecnológica')) return 'Tecnológica';
  if (n.includes('maestría') || n.includes('doctorado') || n.includes('especialización')) return 'Posgrado';
  return 'Universidad';
}

function getDuracion(periodos, periodicidad) {
  if (!periodos) return null;
  const n = parseInt(periodos);
  if (isNaN(n)) return null;
  const p = (periodicidad ?? '').toLowerCase();
  if (p.includes('semestral'))    return `${n} semestres`;
  if (p.includes('anual'))        return `${n} año${n !== 1 ? 's' : ''}`;
  if (p.includes('trimestral'))   return `${n} trimestres`;
  if (p.includes('cuatrimestral'))return `${n} cuatrimestres`;
  return `${n} periodos`;
}

function getModalidad(raw) {
  const m = (raw ?? '').toLowerCase();
  if (m.startsWith('presencial'))   return 'Presencial';
  if (m.startsWith('virtual'))      return 'Virtual';
  if (m.startsWith('a distancia'))  return 'A distancia';
  if (m.startsWith('híbrida') || (m.includes('-') && m.length < 30)) return 'Híbrida';
  if (m.startsWith('dual'))         return 'Dual';
  return raw ? raw : 'Presencial';
}

async function fetchAllActivos() {
  const all = [];
  let offset = 0;
  while (true) {
    const url = `${API_URL}?$where=nombreestadoprograma='Activo'&$limit=${PAGE_SIZE}&$offset=${offset}&$order=codigoprograma+ASC`;
    const res = await fetch(url, { signal: AbortSignal.timeout(60_000) });
    if (!res.ok) throw new Error(`MEN API ${res.status}: ${await res.text()}`);
    const batch = await res.json();
    if (!Array.isArray(batch) || batch.length === 0) break;
    all.push(...batch);
    if (batch.length < PAGE_SIZE) break;
    offset += PAGE_SIZE;
  }
  return all;
}

// GET /api/admin/sincronizacion/estado
const getEstado = async (req, res) => {
  try {
    const { data: ultima } = await supabase
      .from('men_sincronizacion')
      .select('*')
      .order('ejecutada_en', { ascending: false })
      .limit(1)
      .maybeSingle();

    let remoteTimestamp = null;
    let remoteDate = null;
    let hayActualizacion = true;

    try {
      const metaRes = await fetch(METADATA_URL, { signal: AbortSignal.timeout(10_000) });
      if (metaRes.ok) {
        const meta = await metaRes.json();
        remoteTimestamp = meta.rowsUpdatedAt ?? null;
        if (remoteTimestamp) {
          remoteDate = new Date(remoteTimestamp * 1000).toISOString();
          hayActualizacion = !ultima || remoteTimestamp > (ultima.remote_timestamp ?? 0);
        }
      }
    } catch { /* si la API no responde, mostramos como "disponible" */ }

    return res.json({
      success: true,
      ultimaSincronizacion:    ultima?.ejecutada_en           ?? null,
      programasImportados:     ultima?.programas_importados   ?? 0,
      institucionesImportadas: ultima?.instituciones_importadas ?? 0,
      remoteTimestamp,
      remoteDate,
      hayActualizacion,
      ultimoEstado: ultima?.estado ?? null,
    });
  } catch (err) {
    console.error('[Sinc] getEstado error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};

// POST /api/admin/sincronizacion/ejecutar
const ejecutarSincronizacion = async (req, res) => {
  const t0 = Date.now();
  let remoteTimestamp = null;

  try {
    // Obtener timestamp remoto
    try {
      const metaRes = await fetch(METADATA_URL, { signal: AbortSignal.timeout(10_000) });
      if (metaRes.ok) {
        const meta = await metaRes.json();
        remoteTimestamp = meta.rowsUpdatedAt ?? null;
      }
    } catch {}

    // Descargar todos los programas activos
    console.log('[Sinc] Descargando desde MEN API...');
    const records = await fetchAllActivos();
    console.log(`[Sinc] ${records.length} programas activos`);

    // Deduplicar instituciones por nombre
    const instMap = new Map();
    for (const r of records) {
      const nombre = (r.nombreinstitucion ?? '').trim();
      if (!nombre || instMap.has(nombre.toUpperCase())) continue;
      instMap.set(nombre.toUpperCase(), {
        nombre,
        tipo:         getTipoInstitucion(r.nombrecaracteracademico),
        ciudad:       (r.nombremunicipioinstitucion ?? r.nombremunicipio ?? '').trim() || null,
        departamento: (r.nombredepartinstitucion    ?? r.nombredepartamento ?? '').trim() || null,
        activa: true,
      });
    }
    const instArr = Array.from(instMap.values());
    console.log(`[Sinc] ${instArr.length} instituciones únicas`);

    // Limpiar tablas (programas primero por FK → luego instituciones)
    const { error: e1 } = await supabase.from('programas').delete().not('id', 'is', null);
    if (e1) throw new Error(`Borrar programas: ${e1.message}`);
    const { error: e2 } = await supabase.from('instituciones').delete().not('id', 'is', null);
    if (e2) throw new Error(`Borrar instituciones: ${e2.message}`);

    // Insertar instituciones en lotes de 200
    for (let i = 0; i < instArr.length; i += 200) {
      const { error } = await supabase.from('instituciones').insert(instArr.slice(i, i + 200));
      if (error) throw new Error(`Insertar instituciones lote ${i}: ${error.message}`);
    }

    // Cargar mapa nombre → id
    const { data: todasInst } = await supabase.from('instituciones').select('id, nombre');
    const nombreToId = new Map((todasInst ?? []).map(i => [i.nombre.trim().toUpperCase(), i.id]));

    // Construir programas
    const programas = [];
    for (const r of records) {
      const instId = nombreToId.get((r.nombreinstitucion ?? '').trim().toUpperCase());
      if (!instId) continue;
      const nombre = (r.nombreprograma ?? '').trim();
      if (!nombre) continue;
      programas.push({
        nombre:          nombre.substring(0, 200),
        tipo:            getTipoPrograma(r.nombrenivelacademico),
        area_academica:  getAreaAcademica(r.nombrenbc, r.nombreareaconocimiento),
        duracion:        getDuracion(r.cantidadperiodos, r.nombreperiodicidad),
        modalidad:       getModalidad(r.nombremetodologia),
        descripcion:     r.nombretituloobtenido ? `Título: ${String(r.nombretituloobtenido).substring(0, 490)}` : null,
        costo_matricula: null,
        institucion_id:  instId,
        activo:          true,
      });
    }

    // Insertar programas en lotes de 500
    for (let i = 0; i < programas.length; i += 500) {
      const { error } = await supabase.from('programas').insert(programas.slice(i, i + 500));
      if (error) throw new Error(`Insertar programas lote ${i}: ${error.message}`);
    }

    // Registrar resultado exitoso
    await supabase.from('men_sincronizacion').insert({
      remote_timestamp:         remoteTimestamp,
      programas_importados:     programas.length,
      instituciones_importadas: instArr.length,
      estado: 'exitosa',
    });

    const seg = ((Date.now() - t0) / 1000).toFixed(1);
    console.log(`[Sinc] OK en ${seg}s — ${programas.length} programas, ${instArr.length} instituciones`);
    return res.json({
      success: true,
      programasImportados:     programas.length,
      institucionesImportadas: instArr.length,
      duracionSegundos:        parseFloat(seg),
    });

  } catch (err) {
    console.error('[Sinc] Error:', err.message);
    try {
      await supabase.from('men_sincronizacion').insert({
        remote_timestamp: remoteTimestamp, programas_importados: 0,
        instituciones_importadas: 0, estado: 'fallida', error: err.message,
      });
    } catch {}
    return res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { getEstado, ejecutarSincronizacion };
