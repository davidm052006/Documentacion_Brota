# 🏗️ Arquitectura del Sistema – Brota

**Versión: 1.0**  
**Tipo de arquitectura:** Modular Monolítica  
**Compatible con:** GitHub, Obsidian, MkDocs, Docsify

---

# 1. 🌱 Introducción a la Arquitectura

Brota es un sistema inteligente de orientación vocacional que debe ser:

- Escalable
    
- Fácil de mantener
    
- Limpio y organizado
    
- Listo para crecer a microservicios en el futuro
    

Por eso se adopta una **Arquitectura Modular Monolítica**, que combina las ventajas de un monolito (simple, económico, rápido) con la separación lógica propia de los microservicios.

En esta arquitectura:

- El backend es **una sola aplicación**
    
- Pero dividido en **módulos independientes**
    
- Cada módulo representa un **dominio funcional**
    
- No comparten lógica interna
    
- Se comunican por **interfaces / servicios públicos**
    

---

# 2. 📦 Estructura Modular del Sistema

Cada módulo contiene su propio:

- Modelo(s)
    
- Servicios
    
- Controladores
    
- DTOs
    
- Reglas de negocio
    

## 🧩 Lista de módulos de Brota

|Módulo|Descripción|
|---|---|
|**Usuarios**|Manejo de cuentas, perfiles, autenticación|
|**Cuestionarios**|Preguntas, tipos, lógica adaptativa|
|**Respuestas**|Respuestas guardadas por usuario|
|**Recomendador**|Motor que sugiere carreras e instituciones|
|**Programas Académicos**|Carreras universitarias, técnicas, tecnológicas|
|**Instituciones**|Universidades, SENA, institutos, centros|
|**Rutas de Aprendizaje**|Videos, PDFs, actividades|
|**Progreso**|Insignias, logros, barra de progreso|
|**Notificaciones**|Recordatorios y avisos|
|**Reportes**|Exportar perfil a PDF|

---

# 3. 🎯 Diagrama de Arquitectura (PlantUML)



---

# 4. 🧱 Estructura técnica recomendada (NestJS o similar)

`brota-backend/  ├── src/  │   ├── modules/  │   │   ├── usuarios/  │   │   ├── auth/  │   │   ├── cuestionarios/  │   │   ├── respuestas/  │   │   ├── recomendador/  │   │   ├── programas/  │   │   ├── instituciones/  │   │   ├── rutas/  │   │   ├── progreso/  │   │   ├── notificaciones/  │   │   ├── reportes/  │   ├── shared/  │   ├── config/  │   ├── main.ts  ├── package.json  └── README.md`

---

# 5. 🔌 Comunicación entre módulos

Los módulos **NO** acceden directamente a los datos de otros módulos.

### ❌ No permitido:

- Usar modelos internos de otro módulo
    
- Consultar tablas ajenas sin pasar por un servicio
    
- Importar lógica privada de otro módulo
    

### ✔️ Permitido:

- Llamar métodos públicos de un servicio
    

Ejemplo:

`// Recomendador usa datos del módulo Usuarios constructor(private usuariosService: UsuariosService) {}  async generarRecomendacion(idUsuario: string) {   const usuario = await this.usuariosService.obtenerPerfil(idUsuario); }`

---

# 6. 🧠 Flujo de un proceso real

## Ejemplo: _“Generar recomendación vocacional”_

1. El usuario envía solicitud → `/recomendar`
    
2. `RecomendadorController` recibe la solicitud
    
3. `RecomendadorService` consulta:
    
    - `UsuariosService` → perfil
        
    - `RespuestasService` → cuestionario resuelto
        
    - `ProgramasService` → lista de programas
        
    - `InstitucionesService` → oferta académica
        
4. Motor analiza la información
    
5. Devuelve recomendaciones personalizadas
    
6. Se muestra en el frontend
    

---

# 7. 🚀 Ventajas para Brota

|Beneficio|Explicación|
|---|---|
|**Escalable**|Puedes crecer sin romper nada|
|**Ordenado**|Cada módulo es independiente|
|**Listo para microservicios**|Puedes separar un módulo cuando sea necesario|
|**Rendimiento óptimo**|Un solo despliegue, un solo servidor|
|**Costos bajos**|No necesitas infraestructura distribuida|
|**Velocidad de desarrollo**|El equipo trabaja sin fricción|

---

# 8. 🔮 ¿Cuándo migrar a microservicios?

Solo cuando:

- Tengan miles de usuarios simultáneos
    
- El motor de recomendación requiera más potencia
    
- Varias empresas usen Brota
    
- Se necesiten despliegues independientes por módulo
    
- El equipo escale a múltiples desarrolladores por módulo
    

**Por ahora, la arquitectura modular monolítica es perfecta.**