// ==========================================
// TEST DE CONEXIÓN A SUPABASE
// ==========================================
// Este script prueba si la conexión a Supabase funciona
// Coloca este código en el navegador (DevTools Console)

(async () => {
  console.log('🔍 Verificando configuración de Supabase...\n');

  // Obtener las variables de entorno
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  console.log(`URL: ${supabaseUrl ? '✅ Configurada' : '❌ Falta VITE_SUPABASE_URL'}`);
  console.log(`KEY: ${supabaseKey ? '✅ Configurada' : '❌ Falta VITE_SUPABASE_ANON_KEY'}\n`);

  if (!supabaseUrl || !supabaseKey) {
    console.log('⚠️  No hay keys de Supabase configuradas en .env.local');
    console.log('Descomenta las variables y recarga la página.\n');
    return;
  }

  // Importar Supabase desde la config
  try {
    const { supabase } = await import('./src/config/supabase.js');
    
    console.log('🚀 Iniciando pruebas de conexión...\n');

    // 1. Prueba perfiles_usuario
    console.log('1️⃣  Probando tabla perfiles_usuario...');
    const { data: profiles, error: profilesError } = await supabase
      .from('perfiles_usuario')
      .select('*')
      .limit(1);

    if (profilesError) {
      console.error(`❌ Error: ${profilesError.message}`);
    } else {
      console.log(`✅ Tabla accesible (${profiles?.length || 0} registros)\n`);
    }

    // 2. Prueba convocatorias
    console.log('2️⃣  Probando tabla convocatorias...');
    const { data: convocatorias, error: convocError } = await supabase
      .from('convocatorias')
      .select('*')
      .limit(1);

    if (convocError) {
      console.error(`❌ Error: ${convocError.message}`);
    } else {
      console.log(`✅ Tabla accesible (${convocatorias?.length || 0} registros)\n`);
    }

    // 3. Prueba instituciones
    console.log('3️⃣  Probando tabla instituciones...');
    const { data: instituciones, error: instError } = await supabase
      .from('instituciones')
      .select('*')
      .limit(1);

    if (instError) {
      console.error(`❌ Error: ${instError.message}`);
    } else {
      console.log(`✅ Tabla accesible (${instituciones?.length || 0} registros)\n`);
    }

    // 4. Prueba estudio_recomendado
    console.log('4️⃣  Probando tabla estudio_recomendado...');
    const { data: estudios, error: estudError } = await supabase
      .from('estudio_recomendado')
      .select('*')
      .limit(1);

    if (estudError) {
      console.error(`❌ Error: ${estudError.message}`);
    } else {
      console.log(`✅ Tabla accesible (${estudios?.length || 0} registros)\n`);
    }

    // Resumen
    if (!profilesError && !convocError && !instError && !estudError) {
      console.log('✅ ✅ ✅ TODAS LAS CONEXIONES FUNCIONAN CORRECTAMENTE ✅ ✅ ✅\n');
      console.log('📊 Resumen:');
      console.log(`  - Perfiles: ${profiles?.length || 0}`);
      console.log(`  - Convocatorias: ${convocatorias?.length || 0}`);
      console.log(`  - Instituciones: ${instituciones?.length || 0}`);
      console.log(`  - Estudios: ${estudios?.length || 0}`);
      console.log('\n✨ ¡Listo para usar en la aplicación!\n');
    } else {
      console.log('⚠️  Hay errores en algunas tablas. Verifica la configuración.\n');
    }

  } catch (error) {
    console.error('❌ Error al cargar Supabase:', error.message);
  }
})();
