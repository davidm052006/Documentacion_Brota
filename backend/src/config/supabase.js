// ============================================
// CONFIGURACIÓN DE SUPABASE - BACKEND
// ============================================
// Este archivo crea y exporta el cliente de Supabase
// para que otros archivos puedan usarlo

// --------------------------------------------
// 1. IMPORTAR LIBRERÍAS
// --------------------------------------------

// createClient: Función que crea una conexión con Supabase
const { createClient } = require('@supabase/supabase-js');

// dotenv: Lee el archivo .env
require('dotenv').config();

// --------------------------------------------
// 2. LEER VARIABLES DE ENTORNO
// --------------------------------------------

// process.env.VARIABLE_NAME lee variables del archivo .env
// Estas variables contienen las "llaves" para conectarse a Supabase

const supabaseUrl = process.env.SUPABASE_URL;
// Ejemplo: 'https://mebwuyegutwgimqhvjlv.supabase.co'

const supabaseKey = process.env.SUPABASE_SERVICE_KEY;
// Esta es la llave PRIVADA (solo para el backend)
// Tiene permisos de administrador

// --------------------------------------------
// 3. VALIDAR QUE LAS VARIABLES EXISTAN
// --------------------------------------------

// Si falta alguna variable, lanzamos un error
if (!supabaseUrl || !supabaseKey) {
  throw new Error('❌ Faltan variables de entorno de Supabase');
}

// --------------------------------------------
// 4. CREAR EL CLIENTE DE SUPABASE
// --------------------------------------------

// createClient() crea una conexión con Supabase
// Parámetros:
//   1. URL de tu proyecto en Supabase
//   2. Llave de acceso (SERVICE_KEY para backend)
const supabase = createClient(supabaseUrl, supabaseKey);

// Mensaje de confirmación en la consola
console.log('✅ Supabase configurado correctamente');

// --------------------------------------------
// 5. EXPORTAR EL CLIENTE
// --------------------------------------------

// module.exports permite que otros archivos importen este cliente
// Ejemplo de uso en otro archivo:
//   const supabase = require('./config/supabase');
//   const { data } = await supabase.from('programas').select('*');
module.exports = supabase;

// ============================================
// RESUMEN:
// ============================================
// 
// Este archivo hace 3 cosas simples:
// 1. Lee las llaves de Supabase del archivo .env
// 2. Crea una conexión con Supabase usando esas llaves
// 3. Exporta la conexión para que otros archivos la usen
//
// ANALOGÍA:
// Es como configurar el WiFi de tu casa:
// 1. Tienes el nombre de la red (SUPABASE_URL)
// 2. Tienes la contraseña (SUPABASE_SERVICE_KEY)
// 3. Te conectas una vez
// 4. Todos los dispositivos pueden usar esa conexión
