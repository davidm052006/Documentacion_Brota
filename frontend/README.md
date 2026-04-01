# 💻 Frontend - Sistema Brota 🌱

Este directorio contiene todo el código del lado del cliente (frontend) para la plataforma de orientación vocacional **Brota**. El proyecto está construido utilizando **React** y empaquetado con **Vite** para ofrecer una experiencia de desarrollo ultrarrápida.

---

## 🚀 Requisitos Previos

Antes de comenzar a programar, asegúrate de tener instalado:
- **Node.js**: (Versión 18 o superior recomendada).
- Un editor de código como **Visual Studio Code**.

---

## 🛠️ Instalación y Ejecución

Sigue estos pasos para arrancar el proyecto localmente:

1. **Abre tu terminal** y ubícate en esta carpeta (`/frontend`).
2. **Instala las dependencias** corriendo el siguiente comando:
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
4. Abre la URL que te arroja la consola (usualmente `http://localhost:5173`) en tu navegador. 

*Nota: Cualquier cambio que guardes en los archivos se reflejará instantáneamente en el navegador gracias a Vite.*

---

## 📁 Estructura del Proyecto

Para mantener el código ordenado y escalable, utilizamos la siguiente estructura de carpetas estándar dentro de `frontend`:

```text
/frontend
│
├── public/              # Archivos públicos que no cambian (ej. favicon, imágenes estáticas).
├── src/                 # 📂 AQUÍ ES DONDE SUCEDE LA MAGIA (Tu código principal)
│   ├── assets/          # Imágenes, íconos y otros recursos visuales.
│   ├── components/      # Componentes reutilizables (Botones, Tarjetas, Navbar).
│   ├── pages/           # Vistas o pantallas completas (Login, Cuestionario, Dashboard).
│   ├── lib/ o utils/    # Configuraciones externas (ej. la conexión a la base de datos Supabase).
│   ├── main.jsx         # Punto de entrada de React que inyecta la app en el HTML.
│   └── (Otros archivos principales)
│
├── index.html           # El archivo web principal donde "montamos" la aplicación.
├── package.json         # Lista de dependencias, librerías instaladas y scripts.
└── vite.config.js       # Archivo de configuración básica de Vite.
```

---

## 🏗️ Cómo programar en esta estructura

Para que tu código se mantenga profesional y fácil de entender por todo el equipo:

1. **Usa `components/`** para todo pedazo de interfaz que vayas a usar más de una vez. *(Ejemplo: Si tienes un botón verde especial de "Siguiente", no lo programes 10 veces en 10 archivos distintos. Créalo 1 vez en components y llámalo).*
2. **Usa `pages/`** para estructurar la navegación. *(Ejemplo: `Cuestionario.jsx`, `Inicio.jsx`, `Perfil.jsx`)*.
3. **Variables de Entorno (`.env`)**: Recuerda nunca subir tus credenciales reales o URL del proyecto a GitHub. Usa y comparte con tu equipo las variables de entorno para manejar la URL de Supabase y la clave pública (`Anon Key`). Puedes mirar el archivo local `.env.example` en esta carpeta para basarte.

---

## 📦 Construir para Producción

Cuando el sistema Brota esté listo para salir al aire, en lugar de usar el entorno de desarrollo, deberás generar la versión oficial:
```bash
npm run build
```
Esto generará una carpeta oculta `dist/` con todo tu código minificado, comprimido y ultra rápido, empaquetado y listo para ser subido a Vercel, Netlify o cualquier servidor.

---

## 🎨 Paleta de Colores

### Modo Oscuro (Dark Mode)

| Elemento | Color HEX | Descripción |
| :--- | :--- | :--- |
| Primary (fondo principal / navbar / texto fuerte) | `#065F46` | Deep emerald green |
| Gradient de la planta | `#4AC748` → `#48C786` → `#48C7C5` | Organic gradient suave (verde lima → turquesa suave) |
| Botón principal "Crear cuenta gratis" | `#A3E635` | Vibrant lime green |
| Botón secundario "Iniciar sesión" | Bordes en `#FF6B6B` | Coral orange |
| Botón "Enviar" del formulario | `#FF6B6B` | Coral orange |
| Fondo general | `#F8F5EB` | Soft warm cream/off-white |
| Texto principal (headlines) | Blanco (`#FFFFFF`) | Sobre fondo verde oscuro |
| Texto secundario | `#065F46` o negro suave | Según contraste |

### Modo Claro (Light Mode)

| Elemento | Color HEX | Descripción |
| :--- | :--- | :--- |
| Primary (fondo principal / navbar / texto fuerte) | `#065F46` | Deep emerald green |
| Hojas / planta (sólido) | `#065F46` y `#4AC748` | Verde oscuro + verde más vivo (sin gradient) |
| Botón principal "Crear cuenta gratis" | `#A3E635` | Vibrant lime green |
| Botón secundario "Iniciar sesión" | Texto y borde en `#FF6B6B` | Coral orange |
| Botón "Enviar" del formulario | `#FF6B6B` | Coral orange |
| Fondo general | `#F8F5EB` | Soft warm cream/off-white |
| Texto principal (headlines) | `#065F46` | Verde oscuro sobre crema |
| Texto secundario | `#065F46` | Verde oscuro |
