# ✅ CHECKLIST DIARIA Y WEEKLY - PARA DAVID

Use este documento para supervisar el progreso diariamente.

---

## 🚀 SEMANA 1: SETUP Y BACKEND

### 📅 Lunes (Setup Inicial)

#### Brayan - Backend Setup
- [ ] Instalar dependencias (`npm install nodemailer bcryptjs`)
- [ ] Crear archivo `.env`
- [ ] Configurar variables de Supabase
- [ ] Configurar variables de Gmail
- [ ] Probar que `npm run dev` no da errores
- [ ] Verificar que `/api/health` responde 200

**Pregunta de David:** "¿El backend inicia sin errores?"

#### Julián - Frontend Setup
- [ ] Revisar que `npm run dev` funciona
- [ ] Crear carpeta `frontend/src/pages/landing/components/`
- [ ] Revisar componentes existentes (Button, Input, Card)
- [ ] Revisar mockups de recuperación de contraseña

**Pregunta de David:** "¿El frontend corre sin errores?"

#### David - Coordinación
- [ ] Confirmar que ambos tienen el proyecto actualizado
- [ ] Verificar que ambos pueden ejecutar `npm run dev` sin problemas
- [ ] Crear canal de comunicación (Slack, Discord, etc.)

---

### 📅 Martes (Config Backend)

#### Brayan
- [ ] Crear `backend/src/config/supabase.js`
- [ ] Crear `backend/src/config/email.js`
- [ ] Probar envío de email manualmente desde terminal
- [ ] Verificar que email se recibe en bandeja

**Pregunta:** "¿Recibiste el email de prueba?"

#### Julián
- [ ] Crear archivo `frontend/src/pages/landing/components/ForgotPassword.jsx` (vacío)
- [ ] Crear estructura base con estándar del proyecto
- [ ] Revisar estilos de otros componentes

**Pregunta:** "¿El archivo está listo para que empieces a codificar?"

---

### 📅 Miércoles (Database Setup)

#### Brayan
- [ ] Ejecutar SQL para crear tabla `password_reset_tokens`
- [ ] Crear índices en la tabla
- [ ] Verificar en Supabase que tabla existe
- [ ] Probar que puedo insertar datos en tabla
- [ ] Comprobar que puedo hacer queries

**Pregunta:** "¿La tabla está creada y funciona?"

#### Julián
- [ ] Empezar a crear componente `ForgotPassword.jsx`
- [ ] Crear estados (email, loading, error, success)
- [ ] Crear formulario con Input
- [ ] Crear botón "Enviar enlace"

**Pregunta:** "¿El componente se ve correcto (sin funcionalidad aún)?"

---

### 📅 Jueves (Rutas Backend)

#### Brayan
- [ ] Crear `backend/src/routes/auth.js`
- [ ] Implementar `POST /api/auth/forgot-password`
- [ ] Implementar `POST /api/auth/reset-password`
- [ ] Testear ambas rutas con Postman
- [ ] Verificar que tokens se generan
- [ ] Verificar que emails se envían

**Preguntas:**
- "¿Ambas rutas responden 200 con datos válidos?"
- "¿La ruta rechaza emails inválidos?"

#### Julián
- [ ] Agregar lógica `handleSendReset` en ForgotPassword
- [ ] Agregar manejo de errores
- [ ] Agregar mensaje de éxito
- [ ] Testear en modo demo (sin backend)

**Pregunta:** "¿El componente funciona en modo demo?"

#### David
- [ ] Verificar que `/api/auth/forgot-password` funciona
- [ ] Verificar que email se envía correctamente
- [ ] Revisar código de Brayan

---

### 📅 Viernes (Testing Semana 1)

#### Brayan
- [ ] Probar `/api/auth/forgot-password` con emails válidos
- [ ] Probar `/api/auth/forgot-password` con emails inválidos
- [ ] Probar `/api/auth/reset-password` con token válido
- [ ] Probar `/api/auth/reset-password` con token expirado
- [ ] Documentar respuestas de cada ruta

**Entrega:** Documento de respuestas esperadas

#### Julián
- [ ] Testear ForgotPassword en modo demo
- [ ] Verificar que formulario valida email
- [ ] Verificar que botón se deshabilita durante envío
- [ ] Revisar estilos (se ve como mockup?)

**Entrega:** ForgotPassword.jsx listo para integración

#### David
- [ ] Revisar que Brayan entregó rutas funcionando
- [ ] Revisar que Julián entregó componente listo
- [ ] Documentar cualquier issue encontrado
- [ ] Hacer plan de integración para semana 2

**Checklist:**
- [ ] Backend responde sin errores
- [ ] Emails se envían correctamente
- [ ] Frontend tiene componentes creados
- [ ] No hay conflictos de git

---

## 🚀 SEMANA 2: INTEGRACIÓN Y DASHBOARD

### 📅 Lunes (Integración Backend-Frontend)

#### Brayan
- [ ] Actualizar `backend/src/server.js` para incluir rutas auth
- [ ] Documentar endpoints (URL, método, body, response)
- [ ] Soporte si Julián encuentra bugs

**Entrega:** Documentación de endpoints

#### Julián
- [ ] Integrar ForgotPassword con `/api/auth/forgot-password`
- [ ] Actualizar `PreLoguin.jsx` para mostrar ForgotPassword
- [ ] Agregar link "¿Olvidaste tu contraseña?"
- [ ] Testear flujo completo

**Checklist:**
- [ ] No hay CORS error
- [ ] Backend responde correctamente
- [ ] Mensajes de error se muestran

#### David
- [ ] Verificar que integración funciona
- [ ] Revisar que no hay errores en console

---

### 📅 Martes-Miércoles (Dashboard Rediseño)

#### Julián - PRINCIPAL FOCUS
- [ ] Crear componente `Sidebar.jsx`
- [ ] Crear componente `Navbar.jsx`
- [ ] Crear componente `ProfileSidebar.jsx`
- [ ] Reescribir `Dashboard.jsx` con nuevo layout
- [ ] Aplicar estilos Tailwind
- [ ] Verificar responsive design

**Milestones:**
- [ ] Lunes: Estructura básica (3 secciones: sidebar, main, profile)
- [ ] Martes: Componentes con estilos
- [ ] Miércoles: Responsive y pulido

#### Brayan
- [ ] Crear endpoints adicionales si son necesarios para dashboard
- [ ] Revisar código de Julián
- [ ] Soporte general

---

### 📅 Jueves (Dashboard Finalización)

#### Julián
- [ ] Testear dashboard en mobile
- [ ] Testear dashboard en desktop
- [ ] Verificar que se ve como mockup
- [ ] Ajustar estilos si es necesario

**Checklist:**
- [ ] Sidebar tiene todos los items del mockup
- [ ] Navbar muestra perfil usuario
- [ ] Panel de perfil se ve correcto
- [ ] Todo tiene estilos correctos

#### David
- [ ] Revisar que Dashboard se ve bien
- [ ] Comparar con mockups
- [ ] Dar feedback sobre ajustes

---

### 📅 Viernes (Integración Final)

#### Brayan & Julián
- [ ] Testear flujo completo: Login → Forgot → Email → Reset → Dashboard
- [ ] Verificar que no hay errores
- [ ] Verificar que mensajes son claros

#### David
- [ ] Testing integral
- [ ] Documentación final
- [ ] Preparar para deployment

**Checklist Final:**
- [ ] ✅ Login funciona
- [ ] ✅ Forgot password funciona
- [ ] ✅ Email se recibe
- [ ] ✅ Reset password funciona
- [ ] ✅ Dashboard se muestra
- [ ] ✅ No hay CORS errors
- [ ] ✅ No hay errores en console
- [ ] ✅ Responsive design funciona

---

## 📋 CHECKLIST DIARIA (Usa esto cada mañana)

```
┌─────────────────────────────────────────────┐
│  CHECKLIST DIARIA - [FECHA]                 │
├─────────────────────────────────────────────┤
│                                             │
│ BRAYAN:                                     │
│ ☐ Frontend corre: npm run dev               │
│ ☐ Backend corre: npm run dev                │
│ ☐ Puedo acceder a http://localhost:3000    │
│ ☐ Endpoints que creé funcionan              │
│ ☐ Emails se envían correctamente            │
│                                             │
│ JULIÁN:                                     │
│ ☐ Frontend corre: npm run dev               │
│ ☐ Nuevos componentes aparecen               │
│ ☐ Estilos se ven correctos                  │
│ ☐ No hay errores en console                 │
│ ☐ Última integración funciona               │
│                                             │
│ DAVID:                                      │
│ ☐ Ambos proyectos corren                    │
│ ☐ No hay conflictos en git                  │
│ ☐ Pruebé integración fronted-backend        │
│ ☐ No hay CORS errors                        │
│ ☐ Equipo está comunicando                   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## 🔴 CRITICAL ISSUES (Si algo de esto pasa, escala inmediatamente)

- [ ] Backend no inicia
- [ ] CORS error entre frontend y backend
- [ ] Email no se envía
- [ ] Token expira demasiado rápido
- [ ] Conflicto de git sin resolver
- [ ] Cambios no se ven reflejados en otro proyecto
- [ ] Componente toma > 300 líneas de código

---

## 📊 WEEKLY STANDUP (Viernes - 15 min)

**Preguntas para Brayan:**
- ¿Qué completaste esta semana?
- ¿Cuál es el bloqueador más grande?
- ¿Necesitas ayuda de Julián o David?
- ¿Estimas estar listo para integración próxima semana?

**Preguntas para Julián:**
- ¿Qué completaste esta semana?
- ¿El frontend corre sin errores?
- ¿Tienes todo lo que necesitas del backend?
- ¿Qué bloqueadores tienes?

**Preguntas para David:**
- ¿Todo está en orden?
- ¿Hay conflictos entre equipos?
- ¿El cronograma se está cumpliendo?
- ¿Hay riesgos que escalar?

---

## 🎯 MÉTRICAS SEMANALES

### Semana 1 Target
| Métrica | Brayan | Julián |
|---------|--------|--------|
| Dependencias instaladas | ✅ | ✅ |
| Configuración .env | ✅ | N/A |
| Rutas backend | ✅ | N/A |
| Tabla BD creada | ✅ | N/A |
| Emails enviándose | ✅ | N/A |
| Componentes creados | N/A | ✅ |
| Tests modo demo | N/A | ✅ |

### Semana 2 Target
| Métrica | Brayan | Julián |
|---------|--------|--------|
| Rutas integradas | ✅ | ✅ |
| Sin CORS errors | ✅ | ✅ |
| Dashboard rediseñado | N/A | ✅ |
| Flujo completo funciona | ✅ | ✅ |
| Tests integrales | ✅ | ✅ |

---

## 🚨 TROUBLESHOOTING RÁPIDO

**Si Backend no inicia:**
- [ ] Revisar que .env tiene variables correctas
- [ ] Revisar que puertos están libres
- [ ] Reinstalar dependencias: `npm install`

**Si Frontend no inicia:**
- [ ] Revisar que package.json es válido
- [ ] Limpiar node_modules: `rm -rf node_modules && npm install`
- [ ] Revisar puertos

**Si CORS error:**
- [ ] Verificar que backend tiene `app.use(cors())`
- [ ] Verificar que URL es correcta: `http://localhost:3000`
- [ ] Reiniciar backend

**Si Email no se envía:**
- [ ] Revisar que `.env` tiene credenciales correctas
- [ ] Verificar que usas contraseña de APP, no la normal de Gmail
- [ ] Revisar console del backend para errores

---

## 📞 ESCALAMIENTO

### Si hay problema, preguntarse primero:
1. ¿Es un error en el código? → Debuggear juntos
2. ¿Es configuración? → Revisar .env y setup
3. ¿Es conflicto de git? → Resolve manualmente
4. ¿Es diseño/arquitectura? → Cambiar enfoque

### Si no se resuelve en 30 minutos:
- Escalar a más personas del equipo
- Buscar ejemplos online
- Parar y replantear el enfoque

---

## ✨ CELEBRACIONES

Cuando algo funciona:

- ✅ Backend inicia → celebrar
- ✅ Email se envía → celebrar
- ✅ Dashboard se ve bien → celebrar  
- ✅ Integración funciona → GRAN CELEBRACIÓN 🎉

---

**Usa este documento diariamente. Ayuda a todos a estar alineados.**

Última actualización: 07-06-2026
