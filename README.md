# Documento de Requisitos – Sistema Brota (Versión Ampliada)

**Estudiante:** David Paredes, Nicol Rincon, Brayan Moreno, Julian Machado, Brayan Alejandro
**Institución:** Sena CGMLH  
**Curso:** Análisis y Desarrollo de Software  
**Instructor:** Jesus Ropero
**Fecha:** 10/12/2025

---

## 1. Introducción

La documentación de requisitos es una fase fundamental dentro del ciclo de vida del desarrollo de software, ya que permite identificar, analizar y formalizar las necesidades reales de un sistema antes de su implementación. Este proceso asegura que todos los actores involucrados compartan una visión clara, coherente y verificable del sistema a desarrollar.

En el contexto del proyecto **Brota**, se busca construir una plataforma de orientación vocacional inteligente que ayude a jóvenes a tomar decisiones educativas informadas, considerando no solo intereses académicos, sino también habilidades, contexto socioeconómico y expectativas de vida.

Este documento recopila los requisitos funcionales y no funcionales del sistema, así como los modelos conceptuales necesarios para guiar su desarrollo. La documentación sigue las normas APA 7, emplea redacción técnica formal y combina narración, tablas y modelos conceptuales, fortaleciendo las competencias de análisis y diseño de software.

---

## 2. Objetivo General

Elaborar un documento de requisitos claro, completo y estructurado para el sistema Brota, aplicando normas APA 7, modelos conceptuales y buenas prácticas de análisis de software.

---

## 3. Objetivos Específicos

- Identificar los stakeholders del sistema y sus roles.
- Definir requisitos funcionales y no funcionales de forma estructurada.
- Aplicar normas APA 7 en la documentación técnica.
- Describir los modelos conceptuales (ER, UML y BPMN).
- Integrar documentación narrativa, tablas técnicas y diagramas.
- Garantizar coherencia, claridad y consistencia en el documento.

---

## 4. Caso de Estudio – Sistema Brota

Brota es una plataforma de orientación vocacional diseñada para estudiantes entre 14 y 25 años que se enfrentan a la decisión de qué estudiar. Actualmente, muchos jóvenes carecen de acompañamiento personalizado, información clara sobre carreras y acceso a orientación adecuada.

El sistema Brota permitirá:

- Identificar habilidades, intereses y vocación.
- Recomendar carreras universitarias, técnicas y no tradicionales.
- Mostrar instituciones educativas acordes al perfil del estudiante.
- Ofrecer rutas de aprendizaje previas al inicio académico.
- Brindar acompañamiento mediante una asistente virtual.

Este documento formaliza los requerimientos del sistema y sirve como guía para su desarrollo.

---

## 5. Identificación de Stakeholders

### Stakeholders Internos – Primarios
- **Administrador del sistema:** Gestiona carreras, instituciones y contenidos.
- **Orientador académico:** Analiza resultados y acompaña a estudiantes.

### Stakeholders Externos – Primarios
- **Estudiante:** Usuario principal que recibe orientación vocacional.

### Stakeholders Internos – Secundarios
- **Equipo de desarrollo:** Mantiene y mejora la plataforma.

### Stakeholders Externos – Secundarios
- **Familias:** Apoyan el proceso de decisión del estudiante.
- **Instituciones educativas:** Ofrecen programas académicos.

---

## 6. Requisitos Funcionales
[Requisitos completos](<Requerimientos_Brota.md>)


| ID | Descripción | Prioridad |
|----|------------|-----------|
| RF1 | El sistema debe permitir al estudiante completar un cuestionario vocacional | Alta |
| RF2 | El sistema debe generar un perfil de habilidades con porcentajes | Alta |
| RF3 | El sistema debe recomendar carreras según el perfil del usuario | Alta |
| RF4 | El sistema debe mostrar información detallada de cada carrera | Media |
| RF5 | El sistema debe permitir comparar carreras | Media |
| RF6 | El sistema debe mostrar rutas de aprendizaje previas | Media |
| RF7 | El sistema debe generar un reporte descargable en PDF | Media |

---

## 7. Requisitos No Funcionales
[Requisitos completos](<Requerimientos_Brota.md>)
![[modelo entidad relacion (MER).png]]

| ID | Categoría | Descripción |
|----|----------|------------|
| RNF1 | Disponibilidad | El sistema debe estar disponible el 98% del tiempo |
| RNF2 | Rendimiento | Las respuestas deben mostrarse en menos de 2 segundos |
| RNF3 | Usabilidad | La interfaz debe ser clara e intuitiva |
| RNF4 | Seguridad | Los datos deben almacenarse de forma segura |
| RNF5 | Escalabilidad | El sistema debe permitir crecimiento futuro |

---

## 8. Modelos Conceptuales

### 8.1. Modelo ER (Entidad–Relación)

**Entidades principales:**
- Usuario
- PerfilVocacional
- Carrera
- Institución
- RutaAprendizaje
- ResultadoCuestionario

**Relaciones clave:**
- Un Usuario tiene un PerfilVocacional.
- Un PerfilVocacional recomienda varias Carreras.
- Una Carrera puede pertenecer a varias Instituciones.

---

### 8.2. Modelo UML – Caso de Uso (Descripción textual)

**Caso de uso:** Completar cuestionario vocacional  
**Actor:** Estudiante  

**Flujo básico:**
1. El estudiante inicia el cuestionario.
2. Responde preguntas sobre intereses y habilidades.
3. El sistema procesa las respuestas.
4. El sistema genera un perfil vocacional.
5. Se muestran recomendaciones personalizadas.

---

### 8.3. Modelo BPMN – Proceso de Orientación

1. Inicio del proceso.
2. El estudiante responde el cuestionario.
3. El sistema analiza resultados.
4. Se generan recomendaciones.
5. El estudiante explora opciones.
6. Fin del proceso.

---

## 9. Documentación Híbrida

La documentación híbrida integra texto narrativo, tablas y modelos conceptuales, permitiendo una comprensión integral del sistema Brota.

- El **texto narrativo** describe procesos y decisiones.
- Las **tablas técnicas** organizan requisitos y actores.
- Los **diagramas** visualizan la estructura y procesos.
- La **justificación técnica** respalda decisiones de análisis.

Este enfoque garantiza claridad, coherencia y utilidad académica y técnica.

---

## 10. Conclusiones

El presente documento consolida el análisis de requisitos del sistema Brota, definiendo actores, funciones, restricciones y modelos conceptuales. Su correcta estructuración proporciona una base sólida para el diseño, desarrollo y validación del sistema.

---

## 11. Referencias (APA 7)

IEEE. (2011). *IEEE Recommended Practice for Software Requirements Specifications*.  
Sommerville, I. (2011). *Software Engineering* (9th ed.). Pearson Education.

---

## 12. Glosario

- **Requisito:** Necesidad que debe cumplir el sistema.
- **Stakeholder:** Actor interesado en el sistema.
- **Requisito funcional:** Función específica del sistema.
- **Requisito no funcional:** Restricción o cualidad del sistema.
- **BPMN:** Notación para modelar procesos.
- **Caso de uso:** Interacción entre actor y sistema.

---

## 📎 Anexos

### Diagrama ER del sistema Brota
[modelo entidad relacion (ER)](<modelo entidad relacion (MER).png>)
### Diagrama de arquitectura
[diagrama de arquitectura](<diagrama de arquitectura.png>)




