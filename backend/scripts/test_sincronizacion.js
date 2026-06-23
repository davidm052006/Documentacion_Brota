'use strict';
// Test directo del controlador de sincronización (sin servidor HTTP)
// Uso: node scripts/test_sincronizacion.js

require('dotenv').config();
const { getEstado, ejecutarSincronizacion } = require('../src/controllers/sincronizacionController');

function mockRes() {
  let statusCode = 200;
  return {
    statusCode,
    body: null,
    json(data) { this.body = data; return this; },
    status(code) { this.statusCode = code; return this; },
  };
}

async function main() {
  console.log('══════════════════════════════════════');
  console.log(' Test: getEstado');
  console.log('══════════════════════════════════════');
  {
    const res = mockRes();
    await getEstado({}, res);
    console.log('HTTP:', res.statusCode);
    console.log(JSON.stringify(res.body, null, 2));
  }

  console.log('\n══════════════════════════════════════');
  console.log(' Test: ejecutarSincronizacion');
  console.log(' ⚠️  Esto REEMPLAZARÁ todos los datos');
  console.log('══════════════════════════════════════\n');

  const t0 = Date.now();
  const res = mockRes();
  await ejecutarSincronizacion({}, res);

  const seg = ((Date.now() - t0) / 1000).toFixed(1);
  console.log(`\nTiempo total: ${seg}s`);
  console.log('HTTP:', res.statusCode);
  console.log(JSON.stringify(res.body, null, 2));
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
