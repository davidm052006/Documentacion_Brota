// ============================================
// FRONTEND - COMPONENTE PRINCIPAL (App.jsx)
// ============================================
// Este es el componente principal de React
// Define lo que ves en el navegador

// --------------------------------------------
// 1. IMPORTAR DEPENDENCIAS
// --------------------------------------------

// React Hooks: Funciones especiales de React
import { useState, useEffect } from 'react'
// useState: Para manejar datos que cambian (estado)
// useEffect: Para ejecutar código cuando el componente se carga

// Cliente de Supabase configurado
import { supabase } from './config/supabase'

// Estilos CSS para este componente
import './App.css'

// --------------------------------------------
// 2. DEFINIR EL COMPONENTE
// --------------------------------------------

function App() {
  // ¿QUÉ ES UN COMPONENTE?
  // Un componente es como una "pieza" de la interfaz
  // Puede tener:
  // - Estado (datos que cambian)
  // - Lógica (funciones)
  // - Vista (HTML que se muestra)
  
  // --------------------------------------------
  // 3. ESTADO DEL COMPONENTE
  // --------------------------------------------
  
  // useState crea una variable que puede cambiar
  // Sintaxis: const [variable, funcionParaCambiarla] = useState(valorInicial)
  const [connectionStatus, setConnectionStatus] = useState('Verificando...')
  
  // connectionStatus: Variable que guarda el estado de la conexión
  // setConnectionStatus: Función para cambiar el valor de connectionStatus
  // 'Verificando...': Valor inicial
  
  // --------------------------------------------
  // 4. EFECTO (código que se ejecuta al cargar)
  // --------------------------------------------
  
  // useEffect se ejecuta cuando el componente se monta (aparece en pantalla)
  useEffect(() => {
    // Definimos una función asíncrona para verificar la conexión
    const checkConnection = async () => {
      try {
        // Intentamos hacer una consulta a Supabase
        // supabase.from('perfiles_usuario') = selecciona la tabla
        // .select('count') = cuenta cuántos registros hay
        const { data, error } = await supabase
          .from('perfiles_usuario')
          .select('count')
        
        // Si hay un error, verificamos qué tipo de error es
        if (error) {
          // Si la tabla no existe (código 42P01), es normal
          if (error.code === '42P01') {
            // Actualizamos el estado con setConnectionStatus
            setConnectionStatus('✅ Conectado a Supabase (tablas pendientes de crear)')
          } else {
            // Si es otro error, lo mostramos
            setConnectionStatus(`⚠️ Error: ${error.message}`)
          }
        } else {
          // Si no hay error, la conexión es exitosa
          setConnectionStatus('✅ Conectado a Supabase correctamente')
        }
      } catch (err) {
        // Si algo falla completamente, mostramos el error
        setConnectionStatus(`❌ Error de conexión: ${err.message}`)
      }
    }

    // Ejecutamos la función
    checkConnection()
  }, []) // [] = solo se ejecuta una vez al cargar el componente

  // --------------------------------------------
  // 5. RENDERIZADO (lo que se muestra en pantalla)
  // --------------------------------------------
  
  // return devuelve JSX (HTML + JavaScript)
  // JSX es como HTML pero puedes usar variables de JavaScript con {}
  return (
    <div className="App">
      {/* className es como class en HTML (se usa para CSS) */}
      
      <h1>🌱 Brota - Frontend</h1>
      {/* h1 = título principal */}
      
      <div className="card">
        {/* div con clase "card" para aplicar estilos */}
        
        <h2>Estado de Conexión</h2>
        {/* h2 = subtítulo */}
        
        <p>{connectionStatus}</p>
        {/* {connectionStatus} muestra el valor de la variable */}
        {/* Esto cambia dinámicamente cuando llamamos a setConnectionStatus */}
      </div>
      
      <div className="info">
        <p>Frontend corriendo en: <strong>http://localhost:5173</strong></p>
        {/* strong = texto en negrita */}
        
        <p>Backend corriendo en: <strong>http://localhost:3000</strong></p>
      </div>
    </div>
  )
}

// --------------------------------------------
// 6. EXPORTAR EL COMPONENTE
// --------------------------------------------

// export default permite que otros archivos importen este componente
// En main.jsx se importa así: import App from './App.jsx'
export default App

// ============================================
// RESUMEN DE CÓMO FUNCIONA:
// ============================================
//
// 1. El componente se carga en el navegador
// 2. useEffect se ejecuta automáticamente
// 3. checkConnection() hace una petición a Supabase
// 4. Supabase responde (con éxito o error)
// 5. setConnectionStatus actualiza el estado
// 6. React re-renderiza el componente con el nuevo estado
// 7. El usuario ve el mensaje actualizado en pantalla
//
// FLUJO DE DATOS:
//
// Usuario abre navegador
//     ↓
// React carga App.jsx
//     ↓
// useEffect se ejecuta
//     ↓
// checkConnection() llama a Supabase
//     ↓
// Supabase responde
//     ↓
// setConnectionStatus actualiza el estado
//     ↓
// React actualiza la pantalla
//     ↓
// Usuario ve el mensaje
//
// ============================================
// ¿CÓMO CAMBIAR LOS TEXTOS?
// ============================================
//
// Para cambiar el título:
//   <h1>🌱 Brota - Frontend</h1>
//   Cambia a:
//   <h1>🌱 Mi Aplicación</h1>
//
// Para cambiar el subtítulo:
//   <h2>Estado de Conexión</h2>
//   Cambia a:
//   <h2>Estado del Sistema</h2>
//
// Guarda el archivo y el navegador se actualiza automáticamente
