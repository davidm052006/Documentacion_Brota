'use strict';
// Ejecuta la migración men_sincronizacion vía el endpoint pg-meta de Supabase
// Uso: node scripts/run_migration.js
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('❌ Faltan SUPABASE_URL o SUPABASE_SERVICE_KEY en .env');
  process.exit(1);
}

const SQL = `
CREATE TABLE IF NOT EXISTS men_sincronizacion (
  id                       SERIAL PRIMARY KEY,
  ejecutada_en             TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  remote_timestamp         BIGINT,
  programas_importados     INTEGER NOT NULL DEFAULT 0,
  instituciones_importadas INTEGER NOT NULL DEFAULT 0,
  estado                   TEXT NOT NULL DEFAULT 'exitosa',
  error                    TEXT
);
`;

async function main() {
  const pgMetaUrl = `${SUPABASE_URL}/pg-meta/v1/query`;
  console.log(`→ POST ${pgMetaUrl}`);

  const res = await fetch(pgMetaUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${SERVICE_KEY}`,
    },
    body: JSON.stringify({ query: SQL }),
  });

  const body = await res.text();
  if (!res.ok) {
    console.error(`❌ HTTP ${res.status}:`, body);
    process.exit(1);
  }

  console.log(`✅ Migración ejecutada (HTTP ${res.status}):`, body.substring(0, 200));
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1); });
