# 🌱 Modelo de Base de Datos – **Brota**

Documento técnico · Versión inicial MER

---

## 📘 1. Introducción

El modelo entidad–relación (MER) de **Brota** refleja la estructura central del sistema que permite:

- Capturar perfiles vocacionales
    
- Procesar respuestas de cuestionarios
    
- Recomendar carreras y programas
    
- Registrar progreso en rutas de aprendizaje
    
- Interactuar con la mascota IA
    
- Guardar comparaciones y favoritos
    
- Administrar instituciones y contenidos educativos
    

Este documento describe **las tablas**, sus relaciones, **DDL SQL**, y al final podrás añadir la **imagen del MER** exportada desde PlantUML.

---

# 📂 2. Tablas del Modelo

A continuación, cada entidad del MER con sus campos principales.

---

## 🧍 2.1. `Usuario`

|Campo|Tipo|Notas|
|---|---|---|
|id_usuario|INT|**PK**|
|nombre|VARCHAR||
|apellido|VARCHAR||
|correo|VARCHAR|**Único**|
|contraseña|VARCHAR||
|edad|INT||
|genero|VARCHAR||
|ubicacion|VARCHAR||
|tipo_usuario|ENUM(estudiante, padre, admin)||

---

## 🧠 2.2. `PerfilVocacional`

|Campo|Tipo|Notas|
|---|---|---|
|id_perfil|INT|**PK**|
|habilidades_json|TEXT|JSON con porcentajes|
|intereses_json|TEXT||
|vocacion_principal|VARCHAR||
|fecha_generado|DATETIME||
|id_usuario|INT|**FK → Usuario**|

---

## 📝 2.3. `ResultadoCuestionario`

|Campo|Tipo|Notas|
|---|---|---|
|id_resultado|INT|**PK**|
|porcentaje_analitica|INT||
|porcentaje_creatividad|INT||
|porcentaje_social|INT||
|porcentaje_practica|INT||
|fecha|DATETIME||
|id_usuario|INT|**FK → Usuario**|

---

## 📄 2.4. `Cuestionario`

|Campo|Tipo|Notas|
|---|---|---|
|id_cuestionario|INT|**PK**|
|nombre|VARCHAR||
|version|VARCHAR||

---

## ❓ 2.5. `Pregunta`

|Campo|Tipo|Notas|
|---|---|---|
|id_pregunta|INT|**PK**|
|texto|TEXT||
|tipo|ENUM(likert, opcion_multiple)||
|id_cuestionario|INT|**FK → Cuestionario**|

---

## ✏️ 2.6. `Respuesta`

|Campo|Tipo|Notas|
|---|---|---|
|id_respuesta|INT|**PK**|
|valor|INT||
|fecha|DATETIME||
|id_usuario|INT|**FK → Usuario**|
|id_pregunta|INT|**FK → Pregunta**|

---

## 🎓 2.7. `Carrera`

|Campo|Tipo|Notas|
|---|---|---|
|id_carrera|INT|**PK**|
|nombre|VARCHAR||
|dificultad|ENUM(baja, media, alta)||
|salario_promedio|INT||
|descripcion|TEXT||
|area_academica|VARCHAR||

---

## 🏫 2.8. `Institucion`

|Campo|Tipo|Notas|
|---|---|---|
|id_institucion|INT|**PK**|
|nombre|VARCHAR||
|tipo|ENUM(universidad, tecnica, tecnologica, sena, alternativo)||
|ciudad|VARCHAR||
|costo_promedio|INT||

---

## 📘 2.9. `Programa`

|Campo|Tipo|Notas|
|---|---|---|
|id_programa|INT|**PK**|
|nombre|VARCHAR||
|duracion_semestres|INT||
|presencialidad|ENUM(virtual, presencial, hibrido)||
|costo_matricula|INT||
|id_carrera|INT|**FK → Carrera**|
|id_institucion|INT|**FK → Institucion**|

---

## 📚 2.10. `RutaAprendizaje`

|Campo|Tipo|Notas|
|---|---|---|
|id_ruta|INT|**PK**|
|nombre|VARCHAR||
|descripcion|TEXT||
|dificultad|ENUM(basica, media, avanzada)||

---

## 📂 2.11. `ContenidoRuta`

|Campo|Tipo|Notas|
|---|---|---|
|id_contenido|INT|**PK**|
|titulo|VARCHAR||
|tipo|ENUM(video, pdf, quiz, lectura)||
|url|TEXT||
|id_ruta|INT|**FK → RutaAprendizaje**|

---

## 📈 2.12. `ProgresoUsuario`

|Campo|Tipo|Notas|
|---|---|---|
|id_progreso|INT|**PK**|
|completado|BOOLEAN||
|fecha|DATETIME||
|id_usuario|INT|**FK → Usuario**|
|id_contenido|INT|**FK → ContenidoRuta**|

---

## 🤖 2.13. `MascotaIA`

|Campo|Tipo|Notas|
|---|---|---|
|id_mensaje|INT|**PK**|
|texto_usuario|TEXT||
|respuesta_ia|TEXT||
|fecha|DATETIME||
|id_usuario|INT|**FK → Usuario**|

---

## ⭐ 2.14. `Favorito`

|Campo|Tipo|Notas|
|---|---|---|
|id_favorito|INT|**PK**|
|tipo|ENUM(carrera, institucion)||
|id_usuario|INT|**FK → Usuario**|
|id_referencia|INT|ID dinámico (carrera o institución)|

---

## ⚖️ 2.15. `Comparacion`

|Campo|Tipo|Notas|
|---|---|---|
|id_comparacion|INT|**PK**|
|fecha|DATETIME||
|id_usuario|INT|**FK → Usuario**|
|id_carrera_1|INT|**FK → Carrera**|
|id_carrera_2|INT|**FK → Carrera**|

---

---

# 🛠️ 3. DDL SQL Completo (CREATE TABLE)

CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    correo VARCHAR(150) UNIQUE,
    contraseña VARCHAR(200),
    edad INT,
    genero VARCHAR(20),
    ubicacion VARCHAR(100),
    tipo_usuario ENUM('estudiante','padre','admin')
);

CREATE TABLE PerfilVocacional (
    id_perfil INT AUTO_INCREMENT PRIMARY KEY,
    habilidades_json TEXT,
    intereses_json TEXT,
    vocacion_principal VARCHAR(255),
    fecha_generado DATETIME,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE ResultadoCuestionario (
    id_resultado INT AUTO_INCREMENT PRIMARY KEY,
    porcentaje_analitica INT,
    porcentaje_creatividad INT,
    porcentaje_social INT,
    porcentaje_practica INT,
    fecha DATETIME,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Cuestionario (
    id_cuestionario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    version VARCHAR(20)
);

CREATE TABLE Pregunta (
    id_pregunta INT AUTO_INCREMENT PRIMARY KEY,
    texto TEXT,
    tipo ENUM('likert','opcion_multiple'),
    id_cuestionario INT,
    FOREIGN KEY (id_cuestionario) REFERENCES Cuestionario(id_cuestionario)
);

CREATE TABLE Respuesta (
    id_respuesta INT AUTO_INCREMENT PRIMARY KEY,
    valor INT,
    fecha DATETIME,
    id_usuario INT,
    id_pregunta INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_pregunta) REFERENCES Pregunta(id_pregunta)
);

CREATE TABLE Carrera (
    id_carrera INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    dificultad ENUM('baja','media','alta'),
    salario_promedio INT,
    descripcion TEXT,
    area_academica VARCHAR(150)
);

CREATE TABLE Institucion (
    id_institucion INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    tipo ENUM('universidad','tecnica','tecnologica','sena','alternativo'),
    ciudad VARCHAR(100),
    costo_promedio INT
);

CREATE TABLE Programa (
    id_programa INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    duracion_semestres INT,
    presencialidad ENUM('virtual','presencial','hibrido'),
    costo_matricula INT,
    id_carrera INT,
    id_institucion INT,
    FOREIGN KEY (id_carrera) REFERENCES Carrera(id_carrera),
    FOREIGN KEY (id_institucion) REFERENCES Institucion(id_institucion)
);

CREATE TABLE RutaAprendizaje (
    id_ruta INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150),
    descripcion TEXT,
    dificultad ENUM('basica','media','avanzada')
);

CREATE TABLE ContenidoRuta (
    id_contenido INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150),
    tipo ENUM('video','pdf','quiz','lectura'),
    url TEXT,
    id_ruta INT,
    FOREIGN KEY (id_ruta) REFERENCES RutaAprendizaje(id_ruta)
);

CREATE TABLE ProgresoUsuario (
    id_progreso INT AUTO_INCREMENT PRIMARY KEY,
    completado BOOLEAN,
    fecha DATETIME,
    id_usuario INT,
    id_contenido INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_contenido) REFERENCES ContenidoRuta(id_contenido)
);

CREATE TABLE MascotaIA (
    id_mensaje INT AUTO_INCREMENT PRIMARY KEY,
    texto_usuario TEXT,
    respuesta_ia TEXT,
    fecha DATETIME,
    id_usuario INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Favorito (
    id_favorito INT AUTO_INCREMENT PRIMARY KEY,
    tipo ENUM('carrera','institucion'),
    id_usuario INT,
    id_referencia INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

CREATE TABLE Comparacion (
    id_comparacion INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATETIME,
    id_usuario INT,
    id_carrera_1 INT,
    id_carrera_2 INT,
    FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
    FOREIGN KEY (id_carrera_1) REFERENCES Carrera(id_carrera),
    FOREIGN KEY (id_carrera_2) REFERENCES Carrera(id_carrera)
);

---

# 🖼️ 4. MER (Imagen)

![[modelo-entidad-relacion-(MER).png]]