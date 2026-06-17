-- ============================================================
-- POLÍTICAS RLS — Brota
-- Ejecutar en: Supabase Dashboard → SQL Editor
-- ============================================================
-- El backend usa SERVICE_ROLE_KEY y bypasea RLS completamente.
-- Estas policies solo aplican a las queries que el frontend
-- hace directamente con ANON_KEY (lecturas propias y datos públicos).
-- ============================================================


-- ── perfiles ──────────────────────────────────────────────────────────────
-- Necesario para que AdminPanel.jsx pueda verificar el rol del usuario actual.
-- Las policies de admins ya existen (es_admin()). Solo agregar si falta esta:

CREATE POLICY "usuarios ven su propio perfil"
ON perfiles FOR SELECT
USING (auth.uid() = id);


-- ── perfiles_usuario ──────────────────────────────────────────────────────
-- Dashboard.jsx y TestVocacional.jsx leen directamente con ANON_KEY.

CREATE POLICY "usuarios leen su propio perfil_usuario"
ON perfiles_usuario FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "usuarios actualizan su propio perfil_usuario"
ON perfiles_usuario FOR UPDATE
USING (auth.uid() = user_id);


-- ── cuestionarios ─────────────────────────────────────────────────────────
-- perfilService.obtenerCuestionario() lee directo desde el frontend.
-- Los cuestionarios son datos de solo lectura para todos los usuarios.

CREATE POLICY "cuestionarios publicos"
ON cuestionarios FOR SELECT
USING (true);


-- ── preguntas ─────────────────────────────────────────────────────────────

CREATE POLICY "preguntas publicas"
ON preguntas FOR SELECT
USING (true);


-- ── opciones ──────────────────────────────────────────────────────────────
-- perfilService.obtenerCuestionario() hace join con opciones y pesos_opciones.

CREATE POLICY "opciones publicas"
ON opciones FOR SELECT
USING (true);


-- ── pesos_opciones ────────────────────────────────────────────────────────

CREATE POLICY "pesos_opciones publicos"
ON pesos_opciones FOR SELECT
USING (true);


-- ============================================================
-- NOTAS
-- ============================================================
-- 1. Antes de ejecutar, verifica que cada tabla tiene RLS
--    habilitado: Table Editor → tabla → RLS → Enable RLS.
--
-- 2. Si alguna policy ya existe, usa DROP POLICY IF EXISTS
--    antes del CREATE POLICY para evitar el error de duplicado.
--
-- 3. La función public.es_admin() ya debe existir (se creó
--    al corregir la recursión de la tabla perfiles).
--    Si no existe, créala primero:
--
--    CREATE OR REPLACE FUNCTION public.es_admin()
--    RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE
--    SET search_path = public AS $$
--      SELECT EXISTS (SELECT 1 FROM perfiles WHERE id = auth.uid() AND rol = 'admin');
--    $$;
-- ============================================================
