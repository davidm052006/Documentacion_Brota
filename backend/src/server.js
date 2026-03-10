// ============================================
// BACKEND - SERVIDOR PRINCIPAL
// ============================================
// Este archivo crea un servidor web que escucha peticiones HTTP
// y responde con datos en formato JSON

// --------------------------------------------
// 1. IMPORTAR LIBRERÍAS (traer herramientas)
// --------------------------------------------

// express: Librería para crear servidores web fácilmente
const express = require('express');

// cors: Permite que el frontend (localhost:5173) se conecte al backend (localhost:3000)
// Sin esto, el navegador bloquearía las peticiones por seguridad
const cors = require('cors');

// dotenv: Lee el archivo .env y carga las variables de entorno
require('dotenv').config();

// --------------------------------------------
// 2. CREAR LA APLICACIÓN EXPRESS
// --------------------------------------------

// Creamos una instancia de Express (nuestro servidor)
const app = express();

// Definimos el puerto donde correrá el servidor
// Si existe process.env.PORT (del archivo .env), usa ese
// Si no, usa el puerto 3000 por defecto
const PORT = process.env.PORT || 3000;

// --------------------------------------------
// 3. MIDDLEWARE (funciones que procesan las peticiones)
// --------------------------------------------

// cors(): Permite peticiones desde otros dominios (frontend)
app.use(cors());

// express.json(): Permite recibir datos en formato JSON en las peticiones
// Ejemplo: cuando el frontend envía { email: "user@example.com" }
app.use(express.json());

// --------------------------------------------
// 4. RUTAS (ENDPOINTS) - Aquí defines las URLs
// --------------------------------------------

// ¿QUÉ ES UNA RUTA?
// Una ruta es como una "dirección" en tu servidor
// Cuando alguien visita esa dirección, se ejecuta una función

// ESTRUCTURA DE UNA RUTA:
// app.MÉTODO('/ruta', (req, res) => { ... })
//     ↓       ↓        ↓    ↓
//   método   URL    petición respuesta

// MÉTODOS HTTP:
// - GET: Obtener datos (leer)
// - POST: Crear datos nuevos
// - PUT: Actualizar datos existentes
// - DELETE: Eliminar datos

// --------------------------------------------
// RUTA 1: GET /api/health
// --------------------------------------------
// Propósito: Verificar que el servidor está funcionando
// Método HTTP: GET (solo lectura, no modifica nada)
// URL completa: http://localhost:3000/api/health
// Cuándo se llama: Cuando el frontend o tú visitas esa URL

app.get('/api/health', (req, res) => {
  // req = request (petición que llega del cliente)
  //       Contiene información como: URL, headers, parámetros, body
  // res = response (respuesta que enviamos al cliente)
  //       Usamos res.json() para enviar datos en formato JSON
  
  // res.json() envía una respuesta en formato JSON al cliente
  res.json({ 
    status: 'ok',
    message: '🌱 Brota API funcionando correctamente',
    timestamp: new Date().toISOString(), // Fecha y hora actual
    environment: process.env.NODE_ENV // Ambiente (development o production)
  });
  
  // Cuando el frontend llama a esta ruta, recibe:
  // {
  //   "status": "ok",
  //   "message": "🌱 Brota API funcionando correctamente",
  //   "timestamp": "2026-03-10T12:00:00.000Z",
  //   "environment": "development"
  // }
});

// --------------------------------------------
// RUTA 2: GET /api/test-supabase
// --------------------------------------------
// Propósito: Verificar que la conexión con Supabase funciona
// Método HTTP: GET
// URL completa: http://localhost:3000/api/test-supabase
// Cuándo se llama: Para probar la conexión con la base de datos

app.get('/api/test-supabase', async (req, res) => {
  // async: Esta función es asíncrona (puede esperar respuestas)
  // await: Espera a que Supabase responda antes de continuar
  
  try {
    // Importamos el cliente de Supabase configurado
    const supabase = require('./config/supabase');
    
    // Intentamos hacer una consulta a Supabase
    // supabase.from('perfiles_usuario') = selecciona la tabla
    // .select('count') = cuenta cuántos registros hay
    // .limit(1) = solo trae 1 resultado
    const { data, error } = await supabase
      .from('perfiles_usuario')
      .select('count')
      .limit(1);
    
    // Si hubo un error Y no es el error "tabla no existe"
    if (error && error.code !== 'PGRST116') {
      // PGRST116 = código de error que significa "tabla no existe"
      // Es normal si aún no hemos creado las tablas
      throw error; // Lanzamos el error para que lo capture el catch
    }
    
    // Si todo salió bien, enviamos respuesta exitosa
    res.json({
      status: 'ok',
      message: '✅ Conexión con Supabase exitosa',
      note: error?.code === 'PGRST116' 
        ? 'Tablas aún no creadas (normal)' 
        : 'Base de datos lista'
    });
  } catch (error) {
    // Si algo falló, enviamos un error 500 (error del servidor)
    res.status(500).json({
      status: 'error',
      message: '❌ Error conectando con Supabase',
      error: error.message
    });
  }
});

// --------------------------------------------
// 5. MANEJO DE ERRORES GLOBAL
// --------------------------------------------
// Esta función se ejecuta cuando hay un error en cualquier ruta

app.use((err, req, res, next) => {
  // Imprimimos el error en la consola del servidor
  console.error('❌ Error:', err.stack);
  
  // Enviamos respuesta de error al cliente
  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
    // Solo mostramos detalles del error en desarrollo (no en producción)
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  });
});

// --------------------------------------------
// 6. INICIAR EL SERVIDOR
// --------------------------------------------

// app.listen() inicia el servidor en el puerto especificado
// Cuando el servidor está listo, ejecuta la función callback
app.listen(PORT, () => {
  // Mostramos información en la consola
  console.log('');
  console.log('🚀 ================================');
  console.log(`🌱 Brota Backend iniciado`);
  console.log(`📡 Servidor: http://localhost:${PORT}`);
  console.log(`📊 Ambiente: ${process.env.NODE_ENV}`);
  console.log(`✅ Health check: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Test Supabase: http://localhost:${PORT}/api/test-supabase`);
  console.log('🚀 ================================');
  console.log('');
});

// ============================================
// RESUMEN DE CÓMO FUNCIONA:
// ============================================
// 
// 1. El servidor se inicia en http://localhost:3000
// 2. Espera peticiones HTTP (GET, POST, PUT, DELETE)
// 3. Cuando llega una petición a /api/health, ejecuta la función correspondiente
// 4. La función procesa la petición y envía una respuesta con res.json()
// 5. El cliente (frontend) recibe la respuesta y la muestra
//
// EJEMPLO DE FLUJO COMPLETO:
// 
// Frontend hace petición:
//   fetch('http://localhost:3000/api/health')
//     ↓
// Backend recibe la petición en la ruta /api/health
//     ↓
// Backend ejecuta la función: app.get('/api/health', ...)
//     ↓
// Backend envía respuesta: res.json({ status: 'ok', ... })
//     ↓
// Frontend recibe: { "status": "ok", "message": "..." }
//     ↓
// Frontend muestra los datos en la página
