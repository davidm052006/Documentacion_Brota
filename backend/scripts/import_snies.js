// import_snies.js — Importar programas e instituciones desde SNIES Bogotá
// Ejecutar desde /backend:  node scripts/import_snies.js

const XLSX    = require('xlsx');
const path    = require('path');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://mebwuyegutwgimqhvjlv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lYnd1eWVndXR3Z2ltcWh2amx2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc3Mzc5MywiZXhwIjoyMDg4MzQ5NzkzfQ.Wu8S3KV8uXH80wgUdwNZ20eVGAVjRUn3w6tX8J0EUAc'
);

// ── Mapping ÁREA + NBC → area_academica ──────────────────────────────────────
// Estas claves coinciden con vocacionalCategorias.js para que el algoritmo
// de recomendación pueda hacer el matching directo.
const NBC_MAP = {
  // Economía, administración, contaduría y afines
  'administración':                              'administrativo',
  'contaduría pública':                         'negocios',
  'economía':                                   'negocios',

  // Ciencias sociales y humanas
  'comunicación social, periodismo y afines':   'comunicacion',
  'publicidad y afines':                        'comunicacion',
  'derecho y afines':                           'juridico',
  'formación relacionada con el campo militar o policial': 'juridico',
  'psicología':                                 'social',
  'sociología, trabajo social y afines':        'social',
  'ciencia política, relaciones internacionales': 'social',
  'antropología y  artes liberales':            'humanidades',
  'bibliotecología, otros de ciencias sociales y humanas': 'humanidades',
  'geografía, historia':                        'humanidades',
  'lenguas modernas, literatura, linguística y afines': 'humanidades',
  'filosofía, teología y afines':               'humanidades',
  'deportes, educación física y recreación':    'deporte',

  // Ingeniería, arquitectura, urbanismo y afines
  'ingeniería de sistemas, telemática y afines':      'tecnologia',
  'ingeniería electrónica, telecomunicaciones y afines': 'tecnologia',
  'ingeniería eléctrica y afines':              'tecnologia',
  'ingeniería industrial y afines':             'tecnologia',
  'ingeniería civil y afines':                  'tecnologia',
  'ingeniería mecánica y afines':               'tecnologia',
  'otras ingenierías':                          'tecnologia',
  'arquitectura y afines':                      'diseño',
  'ingeniería ambiental, sanitaria y afines':   'ambiental',
  'ingeniería agroindustrial, alimentos y afines': 'ambiental',
  'ingeniería agronómica, pecuaria y afines':   'ambiental',
  'ingeniería agrícola, forestal y afines':     'ambiental',
  'ingeniería de minas, metalurgia y afines':   'ambiental',
  'ingeniería química y afines':                'ciencias',
  'ingeniería biomédica y afines':              'salud',
  'ingeniería administrativa y afines':         'administrativo',

  // Bellas artes
  'artes plásticas, visuales y afines':         'arte',
  'artes representativas':                      'arte',
  'música':                                     'arte',
  'otros programas asociados a bellas artes':   'arte',
  'diseño':                                     'diseño',

  // Matemáticas y ciencias naturales
  'biología, microbiología y afines':           'ciencias',
  'física':                                     'ciencias',
  'geología, otros programas de ciencias naturales': 'ciencias',
  'matemáticas, estadística y afines':          'ciencias',
  'química y afines':                           'ciencias',

  // Agronomía, veterinaria y afines
  'agronomía':                                  'ambiental',
  'medicina veterinaria':                       'salud',
  'zootecnia':                                  'ambiental',

  // Ciencias de la salud (todas → salud)
  'bacteriología':                              'salud',
  'enfermería':                                 'salud',
  'instrumentación quirúrgica':                 'salud',
  'medicina':                                   'salud',
  'nutrición y dietética':                      'salud',
  'odontología':                                'salud',
  'optometría, otros programas de ciencias de la salud': 'salud',
  'salud pública':                              'salud',
  'terapias':                                   'salud',

  // Ciencias de la educación
  'educación':                                  'educacion',
};

function getAreaAcademica(area, nbc) {
  const nbcKey = (nbc ?? '').toLowerCase().trim();
  if (NBC_MAP[nbcKey]) return NBC_MAP[nbcKey];

  // Fallback por área cuando el NBC no matchea
  const areaKey = (area ?? '').toLowerCase();
  if (areaKey.includes('salud'))      return 'salud';
  if (areaKey.includes('educación'))  return 'educacion';
  if (areaKey.includes('bellas'))     return 'arte';
  if (areaKey.includes('matemáticas')) return 'ciencias';
  if (areaKey.includes('agronomía'))  return 'ambiental';
  return null; // sin categoría
}

// ── Mapping CARÁCTER_ACADÉMICO → tipo institución ─────────────────────────────
function getTipoInstitucion(caracter) {
  const c = (caracter ?? '').toLowerCase();
  if (c.includes('técnica profesional')) return 'Técnica';
  if (c.includes('tecnológica') || c.includes('escuela tecnológica')) return 'Tecnológica';
  if (c.includes('universitaria')) return 'Tecnológica';
  return 'Universidad';
}

// ── Mapping NIVEL_DE_FORMACIÓN → tipo programa ───────────────────────────────
function getTipoPrograma(nivel) {
  const n = (nivel ?? '').toLowerCase();
  if (n.includes('técnica profesional') || n.includes('técnico profesional')) return 'Técnica';
  if (n.includes('tecnológico') || n.includes('tecnológica')) return 'Tecnológica';
  if (n.includes('maestría') || n.includes('doctorado') ||
      n.includes('especialización') || n.includes('especialización')) return 'Posgrado';
  return 'Universidad';
}

// ── Duración legible ──────────────────────────────────────────────────────────
function getDuracion(periodos, periodicidad) {
  if (!periodos) return null;
  const p = (periodicidad ?? '').toLowerCase();
  const n = parseInt(periodos);
  if (isNaN(n)) return null;
  if (p.includes('semestral'))  return `${n} semestres`;
  if (p.includes('anual'))      return `${n} año${n !== 1 ? 's' : ''}`;
  if (p.includes('trimestral')) return `${n} trimestres`;
  if (p.includes('cuatrimestral')) return `${n} cuatrimestres`;
  return `${n} periodos`;
}

// ── Normalizar modalidad ──────────────────────────────────────────────────────
function getModalidad(raw) {
  const m = (raw ?? '').toLowerCase();
  if (m.startsWith('presencial')) return 'Presencial';
  if (m.startsWith('virtual'))    return 'Virtual';
  if (m.startsWith('a distancia')) return 'A distancia';
  if (m.startsWith('híbrida') || m.includes('-')) return 'Híbrida';
  if (m.startsWith('dual'))       return 'Dual';
  return raw ?? 'Presencial';
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  console.log('📂 Leyendo archivo Excel...');
  const wb   = XLSX.readFile(path.resolve('../docs/Programas-bogota.xlsx'));
  const sheet = wb.Sheets[wb.SheetNames[0]];
  const rows  = XLSX.utils.sheet_to_json(sheet, { header: 1 });
  const [header, ...data] = rows;

  // Índices de columnas
  const c = name => header.indexOf(name);
  const COL = {
    codInst:    c('CÓDIGO_INSTITUCIÓN'),
    nomInst:    c('NOMBRE_INSTITUCIÓN'),
    estadoInst: c('ESTADO_INSTITUCIÓN'),
    caracter:   c('CARÁCTER_ACADÉMICO'),
    sector:     c('SECTOR'),
    codProg:    c('CÓDIGO_SNIES_DEL_PROGRAMA'),
    nomProg:    c('NOMBRE_DEL_PROGRAMA'),
    titulo:     c('TITULO_OTORGADO'),
    estadoProg: c('ESTADO_PROGRAMA'),
    reconoc:    c('RECONOCIMIENTO_DEL_MINISTERIO'),
    cineAmplio: c('CINE_F_2013_AC_CAMPO_AMPLIO'),
    area:       c('ÁREA_DE_CONOCIMIENTO'),
    nbc:        c('NÚCLEO_BÁSICO_DEL_CONOCIMIENTO'),
    nivel:      c('NIVEL_ACADÉMICO'),
    formacion:  c('NIVEL_DE_FORMACIÓN'),
    modalidad:  c('MODALIDAD'),
    creditos:   c('NÚMERO_CRÉDITOS'),
    periodos:   c('NÚMERO_PERIODOS_DE_DURACIÓN'),
    periodic:   c('PERIODICIDAD'),
    costo:      c('COSTO_MATRÍCULA_ESTUD_NUEVOS'),
  };

  // Todos los programas (sin filtrar por estado)
  const activos = data.filter(r => (r[COL.nomProg] ?? '').trim() !== '');
  console.log(`✅ ${activos.length} programas de ${data.length} filas totales\n`);

  // ── 1. Deduplicar instituciones del Excel ──────────────────────────────────
  const instPorCodigo = new Map();
  activos.forEach(r => {
    const cod = r[COL.codInst];
    if (!instPorCodigo.has(cod)) {
      instPorCodigo.set(cod, {
        nombre:      (r[COL.nomInst] ?? '').trim(),
        tipo:        getTipoInstitucion(r[COL.caracter]),
        ciudad:      'Bogotá',
        departamento: 'Cundinamarca',
        activa:      r[COL.estadoInst] === 'Activa',
      });
    }
  });
  console.log(`🏛️  ${instPorCodigo.size} instituciones únicas en el Excel`);

  // ── 2. Obtener instituciones ya en BD para no duplicar ────────────────────
  const { data: existInst } = await supabase.from('instituciones').select('id, nombre');
  const instNombreToId = new Map((existInst ?? []).map(i => [i.nombre.trim().toUpperCase(), i.id]));
  console.log(`   ${instNombreToId.size} instituciones ya en BD`);

  // Insertar las que faltan
  const instNuevas = [];
  for (const [cod, inst] of instPorCodigo) {
    if (!instNombreToId.has(inst.nombre.toUpperCase())) {
      instNuevas.push(inst);
    }
  }

  if (instNuevas.length > 0) {
    console.log(`   Insertando ${instNuevas.length} instituciones nuevas...`);
    // En lotes de 50
    for (let i = 0; i < instNuevas.length; i += 50) {
      const { error } = await supabase.from('instituciones').insert(instNuevas.slice(i, i + 50));
      if (error) { console.error('   ❌', error.message); process.exit(1); }
    }
  } else {
    console.log('   Todas las instituciones ya existen en BD.');
  }

  // ── 3. Cargar mapa completo código SNIES → BD id ──────────────────────────
  const { data: todasInst } = await supabase.from('instituciones').select('id, nombre');
  const bdNombreToId = new Map((todasInst ?? []).map(i => [i.nombre.trim().toUpperCase(), i.id]));

  // Construir mapa código SNIES → BD id
  const sniesCodigoToBdId = new Map();
  for (const [cod, inst] of instPorCodigo) {
    const bdId = bdNombreToId.get(inst.nombre.toUpperCase());
    if (bdId) sniesCodigoToBdId.set(cod, bdId);
  }
  console.log(`✅ ${todasInst.length} instituciones en BD tras inserción\n`);

  // ── 4. Obtener programas ya existentes (nombre + institucion_id) ──────────
  console.log('📚 Cargando programas existentes...');
  const { data: progExist } = await supabase.from('programas').select('nombre, institucion_id');
  const progSet = new Set((progExist ?? []).map(p => `${(p.nombre||'').toUpperCase()}::${p.institucion_id}`));
  console.log(`   ${progSet.size} programas ya en BD\n`);

  // ── 5. Construir lista de programas a insertar ────────────────────────────
  const programas = [];
  let sinCategoria = 0;
  let sinInstId    = 0;

  for (const r of activos) {
    const codSnies = r[COL.codInst];
    const instId   = sniesCodigoToBdId.get(codSnies);
    if (!instId) { sinInstId++; continue; }

    const nombre = (r[COL.nomProg] ?? '').trim();
    if (!nombre) continue;

    const key = `${nombre.toUpperCase()}::${instId}`;
    if (progSet.has(key)) continue; // ya existe

    const area         = r[COL.area];
    const nbc          = r[COL.nbc];
    const areaAcad     = getAreaAcademica(area, nbc);
    if (!areaAcad) sinCategoria++;

    const costo = r[COL.costo];
    const costoNum = (typeof costo === 'number' && costo > 1000) ? Math.round(costo) : null;

    const titulo = r[COL.titulo] ? `Título otorgado: ${r[COL.titulo]}` : null;
    programas.push({
      nombre:          nombre.substring(0, 200),
      tipo:            getTipoPrograma(r[COL.formacion]),
      area_academica:  areaAcad,
      duracion:        getDuracion(r[COL.periodos], r[COL.periodic]),
      modalidad:       getModalidad(r[COL.modalidad]),
      descripcion:     titulo ? titulo.substring(0, 500) : null,
      costo_matricula: costoNum,
      institucion_id:  instId,
      activo:          true,
    });

    progSet.add(key); // evitar duplicados dentro del mismo lote
  }

  console.log(`📊 Resumen antes de insertar:`);
  console.log(`   Programas a insertar:    ${programas.length}`);
  console.log(`   Sin categoría (null):    ${sinCategoria}`);
  console.log(`   Sin institución en BD:   ${sinInstId}`);
  console.log(`   Ya existían:             ${(activos.length - programas.length - sinInstId)}\n`);

  if (programas.length === 0) {
    console.log('ℹ️  No hay programas nuevos que insertar.');
    return;
  }

  // ── 6. Insertar en lotes de 100 ───────────────────────────────────────────
  const LOTE = 100;
  const total = Math.ceil(programas.length / LOTE);
  console.log(`🚀 Insertando ${programas.length} programas en ${total} lotes...`);

  let ok = 0;
  let errores = 0;
  for (let i = 0; i < programas.length; i += LOTE) {
    const lote = programas.slice(i, i + LOTE);
    const loteNum = Math.floor(i / LOTE) + 1;
    const { error } = await supabase.from('programas').insert(lote);
    if (error) {
      console.error(`   Lote ${loteNum}/${total} ❌ ${error.message}`);
      errores += lote.length;
    } else {
      ok += lote.length;
      const pct = Math.round((loteNum / total) * 100);
      process.stdout.write(`   Lote ${loteNum}/${total} ✓  (${pct}%)\n`);
    }
  }

  // ── 7. Resumen final ──────────────────────────────────────────────────────
  const { count: cProg } = await supabase.from('programas').select('*', { count: 'exact', head: true });
  const { count: cInst } = await supabase.from('instituciones').select('*', { count: 'exact', head: true });

  // Distribución por área
  const { data: distrib } = await supabase
    .from('programas')
    .select('area_academica')
    .not('area_academica', 'is', null);
  const conteo = {};
  (distrib ?? []).forEach(p => { conteo[p.area_academica] = (conteo[p.area_academica] ?? 0) + 1; });

  console.log('\n══════════════════════════════════════════════');
  console.log('✅ Import completado');
  console.log(`   Instituciones en BD: ${cInst}`);
  console.log(`   Programas en BD:     ${cProg}`);
  if (errores > 0) console.log(`   Con errores:         ${errores}`);
  console.log('\n📊 Distribución por área_academica:');
  Object.entries(conteo).sort(([,a],[,b]) => b-a).forEach(([k,v]) => {
    const bar = '█'.repeat(Math.round(v / 50));
    console.log(`   ${k.padEnd(16)} ${String(v).padStart(5)}  ${bar}`);
  });
  console.log('══════════════════════════════════════════════\n');
}

main().catch(err => { console.error('Error fatal:', err); process.exit(1); });
