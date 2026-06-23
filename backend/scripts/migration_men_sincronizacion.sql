-- Ejecutar en Supabase SQL Editor antes de usar la sincronización MEN
-- Panel Admin → SQL Editor → Pegar y ejecutar

CREATE TABLE IF NOT EXISTS men_sincronizacion (
  id                      SERIAL PRIMARY KEY,
  ejecutada_en            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  remote_timestamp        BIGINT,
  programas_importados    INTEGER NOT NULL DEFAULT 0,
  instituciones_importadas INTEGER NOT NULL DEFAULT 0,
  estado                  TEXT NOT NULL DEFAULT 'exitosa',  -- 'exitosa' | 'fallida'
  error                   TEXT
);

-- Solo el rol de servicio puede insertar/leer (la app usa service_role key desde el backend)
ALTER TABLE men_sincronizacion ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Solo backend puede leer sincronizacion"
  ON men_sincronizacion FOR SELECT
  USING (auth.role() = 'service_role');

CREATE POLICY "Solo backend puede insertar sincronizacion"
  ON men_sincronizacion FOR INSERT
  WITH CHECK (auth.role() = 'service_role');
