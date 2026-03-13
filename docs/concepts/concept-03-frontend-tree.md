---
status: HISTORICAL
title: Concepto Visual Frontend - Árbol del Conocimiento
description: Antiguo concepto visual y de interfaz para la plataforma
---

> **[ESTADO: HISTÓRICO]**
> *Nota: Este concepto de navegación por ramas fue reemplazado a nivel de frontend por el "Sistema Planetario de Navegación" (ver `frontend/concepto_sistema_planetario.md`) para solventar problemas de escalabilidad visual.*

# 🌳 (Histórico) Concepto: Árbol del Conocimiento - Frontend Brota

**Versión:** MVP 1.0 (Depreciada)
**Última actualización:** Marzo 2026

---

## 🎨 Visión del Diseño

El **Árbol del Conocimiento** es la identidad visual central de Brota. Representa el viaje de aprendizaje del estudiante de forma intuitiva y simbólica.

### Metáfora Visual

```
🌱 Semilla → Inicio de la curiosidad (registro/bienvenida)
    ↓
🌿 Raíces → Curiosidad y exploración (cuestionario vocacional)
    ↓
🪵 Tronco → "Miles de caminos" (perfil vocacional generado)
    ↓
🌿 Ramas → Áreas de aprendizaje (Tecnología, Ciencias, Artes, etc.)
    ↓
🍃 Hojas → Temas específicos o programas (Ingeniería, Medicina, Diseño, etc.)
```

---

## 🎯 Objetivo del MVP

Crear una navegación visual basada en el árbol que sea:

- ✅ Simple e intuitiva
- ✅ Escalable para futuras animaciones
- ✅ Responsive (mobile-first)
- ✅ Performante

**Fase 1 (MVP):** Árbol estático con transiciones básicas  
**Fase 2 (Futuro):** Animaciones, crecimiento del árbol, interacciones avanzadas

---

## 📐 Estructura UI

### 1. Homepage - Vista del Árbol Completo

```
┌─────────────────────────────────────┐
│         BROTA - Logo                │
├─────────────────────────────────────┤
│                                     │
│           🌳 ÁRBOL                  │
│                                     │
│    Ramas visibles:                  │
│    - Tecnología                     │
│    - Ciencias                       │
│    - Artes                          │
│    - Salud                          │
│    - Negocios                       │
│                                     │
│  [Comenzar mi viaje] (CTA)          │
│                                     │
└─────────────────────────────────────┘
```

### 2. Vista de Rama (Área específica)

```
┌─────────────────────────────────────┐
│  ← Volver al árbol                  │
├─────────────────────────────────────┤
│                                     │
│     🌿 TECNOLOGÍA                   │
│                                     │
│     Hojas (programas):              │
│     🍃 Ingeniería de Sistemas       │
│     🍃 Desarrollo de Software       │
│     🍃 Ciberseguridad              │
│     🍃 Ciencia de Datos            │
│                                     │
└─────────────────────────────────────┘
```

### 3. Vista de Hoja (Programa específico)

```
┌─────────────────────────────────────┐
│  ← Volver a Tecnología              │
├─────────────────────────────────────┤
│                                     │
│  🍃 Ingeniería de Sistemas          │
│                                     │
│  Universidad Nacional               │
│  Duración: 10 semestres             │
│  Modalidad: Presencial              │
│  Compatibilidad: 92% ⭐             │
│                                     │
│  [Ver detalles] [Comparar]          │
│                                     │
└─────────────────────────────────────┘
```

---

## 🧩 Sistema de Componentes

### Componentes Core

#### 1. `TreeVisualization`

**Propósito:** Renderizar el árbol completo

```jsx
<TreeVisualization
  branches={areas}
  onBranchClick={handleBranchClick}
  userProfile={userProfile}
  highlightRecommended={true}
/>
```

**Props:**

- `branches`: Array de áreas (ramas)
- `onBranchClick`: Callback al hacer click en rama
- `userProfile`: Perfil del usuario (para personalización)
- `highlightRecommended`: Resaltar ramas recomendadas

**Estado interno:**

- Posición de ramas
- Hover state
- Animación de entrada

---

#### 2. `Branch`

**Propósito:** Representar una rama individual (área)

```jsx
<Branch
  area="Tecnología"
  icon="💻"
  color="#4CAF50"
  isRecommended={true}
  onClick={handleClick}
/>
```

**Props:**

- `area`: Nombre del área
- `icon`: Emoji o icono
- `color`: Color de la rama
- `isRecommended`: Si está recomendada para el usuario
- `onClick`: Callback

**Estados:**

- `idle`: Estado normal
- `hover`: Mouse encima
- `active`: Seleccionada
- `recommended`: Recomendada (brillo/pulso)

---

#### 3. `Leaf`

**Propósito:** Representar una hoja (programa específico)

```jsx
<Leaf programa={programa} compatibilidad={92} onClick={handleLeafClick} />
```

**Props:**

- `programa`: Objeto con datos del programa
- `compatibilidad`: Porcentaje de match
- `onClick`: Callback

**Variantes:**

- `high-match`: >80% compatibilidad (verde brillante)
- `medium-match`: 60-80% (verde normal)
- `low-match`: <60% (verde pálido)

---

#### 4. `TreeNavigation`

**Propósito:** Navegación entre vistas del árbol

```jsx
<TreeNavigation
  currentView="branch"
  currentArea="Tecnología"
  onBack={handleBack}
/>
```

**Props:**

- `currentView`: 'tree' | 'branch' | 'leaf'
- `currentArea`: Área actual (si aplica)
- `onBack`: Callback para volver

---

#### 5. `Seed` (Animación de inicio)

**Propósito:** Animación de bienvenida (semilla creciendo)

```jsx
<Seed onComplete={handleSeedGrowth} userName={user.nombre} />
```

**Animación:**

1. Semilla aparece
2. Raíces crecen
3. Tronco emerge
4. Ramas se expanden
5. Transición a árbol completo

---

## 🎬 Lógica de Navegación

### Estados de Vista

```javascript
const viewStates = {
  WELCOME: "welcome", // Pantalla de bienvenida
  SEED: "seed", // Animación de semilla
  TREE: "tree", // Vista completa del árbol
  BRANCH: "branch", // Vista de rama específica
  LEAF: "leaf", // Vista de hoja (programa)
  COMPARISON: "comparison", // Comparación de programas
};
```

### Flujo de Navegación

```javascript
// Estado global de navegación
const [navigationState, setNavigationState] = useState({
  currentView: "welcome",
  selectedBranch: null,
  selectedLeaf: null,
  history: [],
});

// Transiciones
const navigateTo = (view, data) => {
  setNavigationState((prev) => ({
    currentView: view,
    selectedBranch: data?.branch || prev.selectedBranch,
    selectedLeaf: data?.leaf || prev.selectedLeaf,
    history: [...prev.history, prev.currentView],
  }));
};

// Volver atrás
const goBack = () => {
  const previousView = navigationState.history.pop();
  setNavigationState((prev) => ({
    ...prev,
    currentView: previousView,
    history: prev.history,
  }));
};
```

### Rutas y URLs

```javascript
// Mapeo de vistas a rutas
const routes = {
  "/": "welcome",
  "/arbol": "tree",
  "/arbol/:area": "branch",
  "/arbol/:area/:programa": "leaf",
};

// Ejemplos:
// /arbol → Vista completa del árbol
// /arbol/tecnologia → Rama de tecnología
// /arbol/tecnologia/ingenieria-sistemas → Programa específico
```

---

## 🎨 Ideas de Animación (MVP vs Futuro)

### MVP (Fase 1) - Animaciones Básicas

```javascript
// Transiciones simples con Framer Motion
const treeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const branchVariants = {
  hover: {
    scale: 1.1,
    transition: { duration: 0.2 },
  },
};
```

**Animaciones MVP:**

- ✅ Fade in/out entre vistas
- ✅ Hover scale en ramas
- ✅ Transición suave al cambiar de vista
- ✅ Loading states

### Fase 2 - Animaciones Avanzadas

**Animaciones Futuras:**

- 🌱 Semilla creciendo (SVG animado)
- 🌿 Raíces extendiéndose
- 🪵 Tronco creciendo verticalmente
- 🌿 Ramas apareciendo secuencialmente
- 🍃 Hojas apareciendo con efecto de brote
- ✨ Partículas de luz al hacer match
- 🌊 Efecto de onda al seleccionar rama
- 🎯 Pulso en ramas recomendadas

---

## ⚛️ Arquitectura React/Next.js

### Estructura de Carpetas

```
frontend/
├── src/
│   ├── components/
│   │   ├── Tree/
│   │   │   ├── TreeVisualization.jsx
│   │   │   ├── Branch.jsx
│   │   │   ├── Leaf.jsx
│   │   │   ├── Seed.jsx
│   │   │   ├── TreeNavigation.jsx
│   │   │   └── index.js
│   │   │
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Container.jsx
│   │   │
│   │   └── Shared/
│   │       ├── Button.jsx
│   │       ├── Card.jsx
│   │       └── Loading.jsx
│   │
│   ├── pages/
│   │   ├── index.jsx              # Homepage (welcome)
│   │   ├── arbol/
│   │   │   ├── index.jsx          # Vista completa del árbol
│   │   │   ├── [area].jsx         # Vista de rama
│   │   │   └── [area]/[programa].jsx  # Vista de hoja
│   │   │
│   │   ├── cuestionario.jsx
│   │   └── perfil.jsx
│   │
│   ├── hooks/
│   │   ├── useTreeNavigation.js
│   │   ├── useTreeData.js
│   │   └── useAnimations.js
│   │
│   ├── contexts/
│   │   ├── TreeContext.jsx
│   │   └── UserContext.jsx
│   │
│   ├── utils/
│   │   ├── treeHelpers.js
│   │   └── animations.js
│   │
│   └── styles/
│       ├── tree.css
│       └── animations.css
```

---

## 🔧 Componentes Principales (Código)

### TreeVisualization.jsx

```jsx
import { useState } from "react";
import { motion } from "framer-motion";
import Branch from "./Branch";

const TreeVisualization = ({
  branches,
  onBranchClick,
  userProfile,
  highlightRecommended,
}) => {
  const [hoveredBranch, setHoveredBranch] = useState(null);

  return (
    <motion.div
      className="tree-container"
      initial="hidden"
      animate="visible"
      variants={treeVariants}
    >
      {/* Tronco */}
      <div className="tree-trunk" />

      {/* Ramas */}
      <div className="tree-branches">
        {branches.map((branch, index) => (
          <Branch
            key={branch.id}
            area={branch.nombre}
            icon={branch.icon}
            color={branch.color}
            isRecommended={
              highlightRecommended &&
              userProfile?.areasRecomendadas?.includes(branch.id)
            }
            position={calculateBranchPosition(index, branches.length)}
            onClick={() => onBranchClick(branch)}
            onHover={() => setHoveredBranch(branch.id)}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default TreeVisualization;
```

### Branch.jsx

```jsx
import { motion } from "framer-motion";
import classNames from "classnames";

const Branch = ({
  area,
  icon,
  color,
  isRecommended,
  position,
  onClick,
  onHover,
}) => {
  const branchClasses = classNames("branch", {
    "branch--recommended": isRecommended,
  });

  return (
    <motion.div
      className={branchClasses}
      style={{
        left: position.x,
        top: position.y,
        "--branch-color": color,
      }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      onHoverStart={onHover}
    >
      <div className="branch__icon">{icon}</div>
      <div className="branch__label">{area}</div>

      {isRecommended && (
        <motion.div
          className="branch__pulse"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      )}
    </motion.div>
  );
};

export default Branch;
```

### useTreeNavigation.js (Custom Hook)

```javascript
import { useState, useCallback } from "react";
import { useRouter } from "next/router";

export const useTreeNavigation = () => {
  const router = useRouter();
  const [history, setHistory] = useState([]);

  const navigateToTree = useCallback(() => {
    router.push("/arbol");
  }, [router]);

  const navigateToBranch = useCallback(
    (area) => {
      setHistory((prev) => [...prev, router.pathname]);
      router.push(`/arbol/${area}`);
    },
    [router],
  );

  const navigateToLeaf = useCallback(
    (area, programa) => {
      setHistory((prev) => [...prev, router.pathname]);
      router.push(`/arbol/${area}/${programa}`);
    },
    [router],
  );

  const goBack = useCallback(() => {
    if (history.length > 0) {
      const previousPath = history[history.length - 1];
      setHistory((prev) => prev.slice(0, -1));
      router.push(previousPath);
    } else {
      router.back();
    }
  }, [history, router]);

  return {
    navigateToTree,
    navigateToBranch,
    navigateToLeaf,
    goBack,
    canGoBack: history.length > 0,
  };
};
```

---

## 📊 Datos del Árbol

### Estructura de Datos

```javascript
// Áreas (Ramas)
const areas = [
  {
    id: "tecnologia",
    nombre: "Tecnología",
    icon: "💻",
    color: "#4CAF50",
    descripcion: "Programación, sistemas, datos",
    programas: ["ing-sistemas", "desarrollo-software", "ciberseguridad"],
  },
  {
    id: "ciencias",
    nombre: "Ciencias",
    icon: "🔬",
    color: "#2196F3",
    descripcion: "Biología, química, física",
    programas: ["biologia", "quimica", "fisica"],
  },
  {
    id: "artes",
    nombre: "Artes",
    icon: "🎨",
    color: "#FF9800",
    descripcion: "Diseño, música, teatro",
    programas: ["diseno-grafico", "musica", "artes-escenicas"],
  },
  {
    id: "salud",
    nombre: "Salud",
    icon: "⚕️",
    color: "#F44336",
    descripcion: "Medicina, enfermería, terapias",
    programas: ["medicina", "enfermeria", "fisioterapia"],
  },
  {
    id: "negocios",
    nombre: "Negocios",
    icon: "💼",
    color: "#9C27B0",
    descripcion: "Administración, economía, marketing",
    programas: ["administracion", "economia", "marketing"],
  },
];
```

---

## 🎯 Enfoque Escalable

### Fase 1: MVP (Actual)

- ✅ Árbol estático con SVG o CSS
- ✅ Transiciones básicas (fade, scale)
- ✅ Navegación funcional
- ✅ Responsive design
- ✅ 5 áreas principales

### Fase 2: Mejoras Visuales

- 🎨 Animación de crecimiento del árbol
- 🎨 Efectos de partículas
- 🎨 Transiciones más fluidas
- 🎨 Personalización del árbol según perfil

### Fase 3: Interactividad Avanzada

- 🚀 Árbol 3D (Three.js)
- 🚀 Realidad aumentada (AR)
- 🚀 Gamificación (árbol crece con progreso)
- 🚀 Colaboración (ver árboles de otros)

---

## 🎨 Paleta de Colores

```css
:root {
  /* Colores del árbol */
  --tree-trunk: #3e2723;
  --tree-roots: #5d4037;

  /* Colores de áreas (ramas) */
  --branch-tecnologia: #4caf50;
  --branch-ciencias: #2196f3;
  --branch-artes: #ff9800;
  --branch-salud: #f44336;
  --branch-negocios: #9c27b0;

  /* Estados */
  --branch-hover: rgba(255, 255, 255, 0.2);
  --branch-recommended: #ffd700;

  /* Hojas */
  --leaf-high-match: #8bc34a;
  --leaf-medium-match: #cddc39;
  --leaf-low-match: #e0e0e0;
}
```

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile First */
.tree-container {
  /* Mobile: Árbol vertical */
  flex-direction: column;
}

@media (min-width: 768px) {
  /* Tablet: Árbol más ancho */
  .tree-container {
    flex-direction: row;
  }
}

@media (min-width: 1024px) {
  /* Desktop: Árbol completo */
  .tree-container {
    max-width: 1200px;
  }
}
```

### Adaptaciones Mobile

**Mobile:**

- Árbol simplificado (lista vertical)
- Ramas como cards
- Navegación por tabs

**Tablet:**

- Árbol semi-visual
- Ramas en grid 2x3

**Desktop:**

- Árbol completo visual
- Todas las ramas visibles

---

## 🚀 Plan de Implementación

### Sprint 1: Estructura Base (Semana 1-2)

- [ ] Setup Next.js + Tailwind
- [ ] Componentes básicos (Branch, Leaf)
- [ ] Navegación entre vistas
- [ ] Routing funcional

### Sprint 2: Visualización del Árbol (Semana 3-4)

- [ ] TreeVisualization component
- [ ] Posicionamiento de ramas
- [ ] Estilos y colores
- [ ] Responsive design

### Sprint 3: Integración con Backend (Semana 5-6)

- [ ] Conectar con API de programas
- [ ] Mostrar recomendaciones
- [ ] Filtros por convocatorias activas
- [ ] Loading states

### Sprint 4: Animaciones MVP (Semana 7-8)

- [ ] Transiciones básicas
- [ ] Hover effects
- [ ] Animación de entrada
- [ ] Polish general

---

## 📝 Notas para el Equipo

### Para Brayan Arias (Cuestionario & Visualización):

- Enfócate en el componente `TreeVisualization`
- Trabaja en la animación de entrada del árbol
- Implementa el sistema de colores por área

### Para Julian (Recomendaciones & UI):

- Enfócate en los componentes `Branch` y `Leaf`
- Implementa la lógica de navegación
- Trabaja en las vistas de detalle de programas

### Recursos de Aprendizaje:

- [Framer Motion](https://www.framer.com/motion/) - Animaciones
- [React Spring](https://www.react-spring.dev/) - Alternativa para animaciones
- [SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial) - Para el árbol

---

[← Volver a Frontend](README.md) | [Ver Flujo de Usuario](flujo_usuario.md)
