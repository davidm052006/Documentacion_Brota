# 📋 RESUMEN EJECUTIVO - PLAN DE TRABAJO

## 🎯 Objetivo General
Organizar el equipo (Julián, Brayan, David) para que trabajen en paralelo en sus respectivas áreas sin conflictos y con máxima eficiencia.

---

## 👥 Quién Hace Qué

| Persona | Rol | Principal Responsabilidad | Entrega Final |
|---------|-----|---------------------------|---------------|
| **BRAYAN** | Backend | Crear servidor REST con rutas de autenticación, emails y BD | `/api/auth/forgot-password` y `/api/auth/reset-password` funcionando |
| **JULIÁN** | Frontend | Crear interfaz visual según mockups, integrar con backend | Dashboard rediseñado + Recuperación de contraseña funcionando |
| **DAVID** | Coordinador | Supervisar, revisar code, testear integración | Todo funciona sin errores |

---

## 📦 Trabajo a Hacer

### 🔴 BRAYAN - BACKEND (Crítico)

**Tareas en Orden:**

1. **Instalación (1 día)**
   - `npm install nodemailer bcryptjs`
   - Crear `.env` con variables de Supabase y Gmail
   - ✅ Probar que backend corre

2. **Configuración (1 día)**
   - Crear `backend/src/config/supabase.js`
   - Crear `backend/src/config/email.js`
   - Probar envío de emails manualmente

3. **Base de Datos (1 día)**
   - Ejecutar SQL para crear tabla `password_reset_tokens`
   - Crear índices para búsquedas rápidas
   - ✅ Verificar tabla en Supabase

4. **Rutas (2 días)**
   - Crear `backend/src/routes/auth.js`
   - Implementar `POST /api/auth/forgot-password`
   - Implementar `POST /api/auth/reset-password`
   - Implementar `GET /api/auth/validate-token` (opcional)

5. **Testing (1 día)**
   - Probar rutas con Postman
   - Verificar emails se envían
   - Validar tokens funcionan

**Tiempo Total:** 6 días (1.2 semanas)

**Archivos a crear/modificar:**
```
backend/
├── .env (CREAR)
├── src/
│   ├── config/
│   │   ├── supabase.js (CREAR)
│   │   └── email.js (CREAR)
│   ├── routes/
│   │   └── auth.js (CREAR)
│   └── server.js (MODIFICAR - agregar rutas)
└── setup_database.sql (MODIFICAR - agregar tabla)
```

---

### 🟦 JULIÁN - FRONTEND (Importante)

**Tareas en Orden:**

1. **Preparación (1 día)**
   - Crear estructura de carpetas para nuevos componentes
   - Familiarizarse con estructura existente

2. **Componentes (2 días)**
   - Crear `ForgotPassword.jsx`
   - Crear `ResetPassword.jsx`
   - Crear componentes del Dashboard (Sidebar, Navbar, ProfileSidebar)

3. **Integración PreLoguin (1 día)**
   - Integrar ForgotPassword en PreLoguin
   - Agregar link "¿Olvidaste tu contraseña?"

4. **Dashboard Rediseño (2 días)**
   - Reescribir Dashboard.jsx con nuevo mockup
   - Agregar estilos Tailwind
   - Hacer responsive

5. **Integración Backend (1 día)**
   - Conectar ForgotPassword con `/api/auth/forgot-password`
   - Conectar ResetPassword con `/api/auth/reset-password`
   - Manejar errores y respuestas

6. **Testing (1 día)**
   - Probar formularios en modo demo
   - Probar con backend real
   - Verificar responsive design

**Tiempo Total:** 8 días (1.6 semanas)

**Archivos a crear/modificar:**
```
frontend/
├── src/
│   ├── pages/
│   │   ├── landing/
│   │   │   ├── PreLoguin.jsx (MODIFICAR)
│   │   │   └── components/
│   │   │       ├── ForgotPassword.jsx (CREAR)
│   │   │       └── ResetPassword.jsx (CREAR)
│   │   └── dashboard/
│   │       └── Dashboard.jsx (MODIFICAR)
│   ├── components/
│   │   └── [nuevos componentes] (CREAR)
│   └── App.jsx (MODIFICAR - agregar ruta ResetPassword)
```

---

### 🟩 DAVID - COORDINACIÓN (Supervisor)

**Tareas Daily:**

1. Revisar que ambos siguen el plan
2. Validar que no hay conflictos de git
3. Hacer merge de cambios regularmente
4. Testear integración entre frontend y backend
5. Resolver dudas o bloqueos

**Tareas Semanales:**
- Sprint review (¿qué se hizo?)
- Sprint planning (¿qué sigue?)
- Testing integral

**Entrega Final:**
- ✅ Flujo completo funciona: Login → Olvido contraseña → Correo → Reset → Nuevo Login
- ✅ Dashboard se ve como mockup
- ✅ No hay errores CORS
- ✅ Emails se envían correctamente
- ✅ Código está documentado

---

## 📅 Cronograma

### **Semana 1: Setup y Backend**

| Día | Brayan | Julián | David |
|-----|--------|--------|-------|
| Lun | Instalar deps, crear .env | Revisar estructura | Supervisar setup |
| Mar | Configurar Supabase y Email | Crear estructura carpetas | Validar ambos corren |
| Mié | Crear tabla en BD | Crear componentes | Revisar código |
| Jue | Crear rutas auth | Integrar ForgotPassword | Testing |
| Vie | Testing con Postman | Testing en modo demo | Code Review |

### **Semana 2: Frontend y Integración**

| Día | Brayan | Julián | David |
|-----|--------|--------|-------|
| Lun | Soporte si hay bugs | Rediseñar Dashboard | Integración testing |
| Mar | Optimización | Componentes Dashboard | Validar UI |
| Mié | Validaciones extra | Estilos y responsive | Testing |
| Jue | Final tweaks | Integración con backend | Testing completo |
| Vie | Deploy prep | Deploy prep | Deploy |

---

## 🎯 Deliverables

### **Entrega #1 (Final de Semana 1)**
```
✅ Backend completamente funcional
   - Rutas POST /api/auth/forgot-password
   - Rutas POST /api/auth/reset-password
   - Emails enviándose correctamente
   - Tabla password_reset_tokens creada

❓ Frontend parcialmente
   - ForgotPassword.jsx creado pero sin conectar backend
   - Testeable en modo demo
```

### **Entrega #2 (Final de Semana 2)**
```
✅ Frontend completamente funcional
   - ForgotPassword integrado con backend
   - ResetPassword integrado con backend
   - Dashboard rediseñado según mockup
   - Todo responsive

✅ Backend completamente funcional
   - Validaciones completas
   - Error handling robusto
   - Documentación de endpoints
```

### **Entrega Final (Listo para Producción)**
```
✅ Flujo completo de recuperación de contraseña
   - Login → Olvido → Correo → Link → Reset → Nuevo login
   - Sin errores
   - Bien documentado

✅ Dashboard nuevo
   - Se ve como el mockup
   - Funciona en desktop y mobile
   - Integrado con backend

✅ Código limpio
   - Sin TODO o FIXME
   - Bien comentado
   - Tests básicos
```

---

## ⚠️ Riesgos y Mitigación

| Riesgo | Impacto | Mitigación |
|--------|--------|-----------|
| Gmail rechaza contraseña | 🔴 CRÍTICO | Usar contraseña de APP, no la normal |
| CORS error en integración | 🔴 CRÍTICO | Asegurar `app.use(cors())` en backend |
| Token expirado muy rápido | 🟠 ALTO | Usar 30 minutos como expiration |
| Conflictos de git | 🟠 ALTO | Dividir por carpetas, commits claros |
| Backend no listo a tiempo | 🟠 ALTO | Julián usa modo demo mientras tanto |
| Validaciones incompletas | 🟠 ALTO | David hace testing integral al final |

---

## 📊 Métricas de Éxito

### Semana 1
- ✅ Brayan: Backend responde sin errores, emails se envían
- ✅ Julián: Frontend corre sin errores, componentes creados
- ✅ David: Ambos proyectos funcionan independientemente

### Semana 2
- ✅ Brayan: Rutas completas, validaciones listas
- ✅ Julián: Dashboard rediseñado, ForgotPassword integrado
- ✅ David: Flujo completo funciona, sin errores CORS

### Final
- ✅ Todo funciona end-to-end
- ✅ Cero errores en console
- ✅ Código limpio y documentado
- ✅ Listo para production

---

## 🔗 Documentación Generada

He creado 3 documentos en `docs/`:

1. **`DISTRIBUCION_TRABAJO.md`** - Plan detallado para Brayan y Julián
   - Qué hacer, en qué archivos, en qué orden
   - Explicaciones claras de cada componente

2. **`GUIA_IMPLEMENTACION_CODIGO.md`** - Código listo para copiar/pegar
   - Fragmentos de código listos para usar
   - Ejemplos de cómo llamar endpoints
   - Guía de testing con Postman

3. **`RECOMENDACIONES_COORDINACION.md`** - Best practices del equipo
   - Cómo colaborar sin conflictos
   - Qué hacer y qué NO hacer
   - Problemas comunes y soluciones
   - Preguntas clave que deben hacerse

---

## 🚀 Cómo Empezar

### **HOY - DAVID:**
1. Comparte estos 3 documentos con Brayan y Julián
2. Reúnete con ellos para explicar el plan
3. Asigna tareas específicas para esta semana
4. Crea tablero Trello o similar para tracking

### **HOY - BRAYAN:**
1. Lee `DISTRIBUCION_TRABAJO.md` (PART 2)
2. Lee `GUIA_IMPLEMENTACION_CODIGO.md` (PARTE 2)
3. Instala dependencias: `npm install nodemailer`
4. Crea archivo `.env` con variables

### **HOY - JULIÁN:**
1. Lee `DISTRIBUCION_TRABAJO.md` (PART 1)
2. Lee `RECOMENDACIONES_COORDINACION.md`
3. Revisa los mockups que compartió David
4. Crea la estructura de carpetas para componentes

---

## 💬 Comandos Útiles

**Para empezar (Brayan - Backend):**
```bash
cd backend
npm install nodemailer bcryptjs
cp .env.example .env
# Editar .env con valores reales
npm run dev
```

**Para empezar (Julián - Frontend):**
```bash
cd frontend
npm install
npm run dev
# En navegador: http://localhost:5173
```

**Para testear (Brayan):**
```bash
# Con Postman o curl
curl -X POST http://localhost:3000/api/health
curl -X POST http://localhost:3000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@gmail.com"}'
```

---

## ✨ Notas Finales

### Para Brayan:
- Tu trabajo es la base de todo - hazlo robusto
- Testea cada endpoint ANTES de decirle a Julián que está listo
- Devuelve respuestas claras y predecibles
- Valida SIEMPRE en el backend

### Para Julián:
- No esperes a que Brayan termine para empezar - usa modo demo
- Hazlo hermoso - la UX es tu responsabilidad
- Integra paso a paso, no todo al final
- Reporta bugs rápidamente

### Para David:
- Eres el "pegamento" del equipo
- Comunica claramente qué se espera
- Resuelve bloqueos rápidamente
- Celebra los wins pequeños

---

## 📞 Contacto y Escalado

Si hay problemas:
1. David → resuelve o escala
2. Brayan ↔ Julián → se comunican directamente
3. Todos → revisamos el plan y ajustamos

---

**Estado del Proyecto: 🟢 LISTO PARA COMENZAR**

Última actualización: 07-06-2026
Responsable: David
