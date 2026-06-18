// seed_instituciones.js
// Poblar instituciones y programas en Supabase
// Ejecutar: node backend/scripts/seed_instituciones.js

const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://mebwuyegutwgimqhvjlv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1lYnd1eWVndXR3Z2ltcWh2amx2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3Mjc3Mzc5MywiZXhwIjoyMDg4MzQ5NzkzfQ.Wu8S3KV8uXH80wgUdwNZ20eVGAVjRUn3w6tX8J0EUAc'
);

// ── Instituciones ─────────────────────────────────────────────────────────────
const INSTITUCIONES = [
  // Universidades públicas
  { nombre: 'Universidad Nacional de Colombia', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://unal.edu.co', activa: true },
  { nombre: 'Universidad de Antioquia', tipo: 'Universidad', ciudad: 'Medellín', departamento: 'Antioquia', sitio_web: 'https://www.udea.edu.co', activa: true },
  { nombre: 'Universidad del Valle', tipo: 'Universidad', ciudad: 'Cali', departamento: 'Valle del Cauca', sitio_web: 'https://www.univalle.edu.co', activa: true },
  { nombre: 'Universidad Distrital Francisco José de Caldas', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.udistrital.edu.co', activa: true },
  { nombre: 'Universidad Tecnológica de Pereira', tipo: 'Universidad', ciudad: 'Pereira', departamento: 'Risaralda', sitio_web: 'https://www.utp.edu.co', activa: true },
  { nombre: 'Universidad de Caldas', tipo: 'Universidad', ciudad: 'Manizales', departamento: 'Caldas', sitio_web: 'https://www.ucaldas.edu.co', activa: true },
  { nombre: 'Universidad del Atlántico', tipo: 'Universidad', ciudad: 'Barranquilla', departamento: 'Atlántico', sitio_web: 'https://www.uniatlantico.edu.co', activa: true },
  { nombre: 'Universidad de Córdoba', tipo: 'Universidad', ciudad: 'Montería', departamento: 'Córdoba', sitio_web: 'https://www.unicordoba.edu.co', activa: true },

  // Universidades privadas
  { nombre: 'Universidad de los Andes', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://uniandes.edu.co', activa: true },
  { nombre: 'Pontificia Universidad Javeriana', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.javeriana.edu.co', activa: true },
  { nombre: 'Universidad EAFIT', tipo: 'Universidad', ciudad: 'Medellín', departamento: 'Antioquia', sitio_web: 'https://www.eafit.edu.co', activa: true },
  { nombre: 'Universidad del Rosario', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.urosario.edu.co', activa: true },
  { nombre: 'Universidad Externado de Colombia', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.uexternado.edu.co', activa: true },
  { nombre: 'Universidad Pontificia Bolivariana', tipo: 'Universidad', ciudad: 'Medellín', departamento: 'Antioquia', sitio_web: 'https://www.upb.edu.co', activa: true },
  { nombre: 'Universidad de La Sabana', tipo: 'Universidad', ciudad: 'Chía', departamento: 'Cundinamarca', sitio_web: 'https://www.unisabana.edu.co', activa: true },
  { nombre: 'Universidad del Norte', tipo: 'Universidad', ciudad: 'Barranquilla', departamento: 'Atlántico', sitio_web: 'https://www.uninorte.edu.co', activa: true },
  { nombre: 'Universidad Santo Tomás', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.usta.edu.co', activa: true },
  { nombre: 'Universidad Sergio Arboleda', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.usergioarboleda.edu.co', activa: true },
  { nombre: 'UNIMINUTO - Corporación Universitaria Minuto de Dios', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.uniminuto.edu', activa: true },
  { nombre: 'Universidad Autónoma de Colombia', tipo: 'Universidad', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.fuac.edu.co', activa: true },

  // SENA
  { nombre: 'SENA - Servicio Nacional de Aprendizaje', tipo: 'SENA', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.sena.edu.co', activa: true },
  { nombre: 'SENA Regional Antioquia', tipo: 'SENA', ciudad: 'Medellín', departamento: 'Antioquia', sitio_web: 'https://www.sena.edu.co', activa: true },
  { nombre: 'SENA Regional Valle del Cauca', tipo: 'SENA', ciudad: 'Cali', departamento: 'Valle del Cauca', sitio_web: 'https://www.sena.edu.co', activa: true },

  // Instituciones tecnológicas
  { nombre: 'Instituto Tecnológico Metropolitano - ITM', tipo: 'Tecnológica', ciudad: 'Medellín', departamento: 'Antioquia', sitio_web: 'https://www.itm.edu.co', activa: true },
  { nombre: 'Politécnico Colombiano Jaime Isaza Cadavid', tipo: 'Tecnológica', ciudad: 'Medellín', departamento: 'Antioquia', sitio_web: 'https://www.politecnicojic.edu.co', activa: true },
  { nombre: 'Colegio Mayor de Cundinamarca', tipo: 'Tecnológica', ciudad: 'Bogotá', departamento: 'Cundinamarca', sitio_web: 'https://www.unicolmayor.edu.co', activa: true },
  { nombre: 'Institución Universitaria Pascual Bravo', tipo: 'Tecnológica', ciudad: 'Medellín', departamento: 'Antioquia', sitio_web: 'https://www.pascualbravo.edu.co', activa: true },
  { nombre: 'CESDE Formación Técnica', tipo: 'Técnica', ciudad: 'Medellín', departamento: 'Antioquia', sitio_web: 'https://www.cesde.edu.co', activa: true },
];

// ── Programas por institución (referenciados por índice en INSTITUCIONES) ────
// area_academica debe coincidir con las claves de vocacionalCategorias.js
// para que el algoritmo de recomendación pueda hacer el matching
const PROGRAMAS_POR_INST = {
  'Universidad Nacional de Colombia': [
    { nombre: 'Ingeniería de Sistemas y Computación', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Forma profesionales capaces de diseñar, desarrollar e implementar soluciones de software y sistemas computacionales.' },
    { nombre: 'Ingeniería Electrónica', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Diseño y desarrollo de sistemas electrónicos, telecomunicaciones y automatización.' },
    { nombre: 'Biología', tipo: 'Universidad', area_academica: 'ciencias', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Estudio de los seres vivos, sus estructuras, funciones, evolución y relación con el ambiente.' },
    { nombre: 'Medicina', tipo: 'Universidad', area_academica: 'salud', duracion: '12 semestres', modalidad: 'Presencial', descripcion: 'Formación integral del médico para la promoción, prevención, diagnóstico y tratamiento de enfermedades.' },
    { nombre: 'Derecho', tipo: 'Universidad', area_academica: 'juridico', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Comprensión y aplicación del ordenamiento jurídico colombiano e internacional.' },
    { nombre: 'Arquitectura', tipo: 'Universidad', area_academica: 'diseño', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Diseño de espacios habitables con criterios estéticos, funcionales y sostenibles.' },
    { nombre: 'Matemáticas', tipo: 'Universidad', area_academica: 'ciencias', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Formación en pensamiento matemático puro y aplicado, con énfasis en investigación.' },
    { nombre: 'Administración de Empresas', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Gestión eficiente de organizaciones públicas y privadas en entornos competitivos.' },
  ],
  'Universidad de Antioquia': [
    { nombre: 'Ingeniería de Sistemas', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Desarrollo de software, redes y gestión de tecnologías de la información.' },
    { nombre: 'Comunicación Audiovisual', tipo: 'Universidad', area_academica: 'comunicacion', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Producción de contenidos audiovisuales para cine, televisión y plataformas digitales.' },
    { nombre: 'Trabajo Social', tipo: 'Universidad', area_academica: 'social', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Intervención profesional para el bienestar de individuos, familias y comunidades en situación de vulnerabilidad.' },
    { nombre: 'Licenciatura en Matemáticas y Física', tipo: 'Universidad', area_academica: 'educacion', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Formación de docentes en ciencias exactas con énfasis en pedagogía activa.' },
    { nombre: 'Odontología', tipo: 'Universidad', area_academica: 'salud', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Diagnóstico y tratamiento de enfermedades orales, con enfoque preventivo y comunitario.' },
    { nombre: 'Química', tipo: 'Universidad', area_academica: 'ciencias', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Estudio de la materia, sus propiedades y transformaciones, con aplicación en industria e investigación.' },
  ],
  'Universidad del Valle': [
    { nombre: 'Ingeniería de Sistemas y Computación', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Formación en desarrollo de software, inteligencia artificial y arquitectura de sistemas.' },
    { nombre: 'Diseño Gráfico', tipo: 'Universidad', area_academica: 'diseño', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Creación de comunicaciones visuales para medios impresos, digitales y audiovisuales.' },
    { nombre: 'Psicología', tipo: 'Universidad', area_academica: 'social', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Comprensión del comportamiento humano y aplicación de intervenciones terapéuticas y organizacionales.' },
    { nombre: 'Ingeniería Ambiental', tipo: 'Universidad', area_academica: 'ambiental', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Gestión y protección del medio ambiente mediante tecnologías sostenibles y normativa ambiental.' },
    { nombre: 'Contaduría Pública', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Control financiero, auditoría y gestión tributaria para empresas y entidades públicas.' },
  ],
  'Universidad de los Andes': [
    { nombre: 'Ingeniería de Sistemas y Computación', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Programa líder en Colombia en formación de ingenieros de software e innovación tecnológica.' },
    { nombre: 'Administración de Empresas', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Liderazgo empresarial y emprendimiento con perspectiva global y responsabilidad social.' },
    { nombre: 'Diseño Industrial', tipo: 'Universidad', area_academica: 'diseño', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Diseño de productos con enfoque en innovación, experiencia de usuario y sostenibilidad.' },
    { nombre: 'Economía', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Análisis de mercados, políticas públicas y estrategias de desarrollo económico.' },
    { nombre: 'Artes', tipo: 'Universidad', area_academica: 'arte', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Exploración plástica, conceptual y multimedia con énfasis en procesos creativos contemporáneos.' },
    { nombre: 'Derecho', tipo: 'Universidad', area_academica: 'juridico', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Formación jurídica de excelencia con énfasis en derechos humanos y litigación estratégica.' },
  ],
  'Pontificia Universidad Javeriana': [
    { nombre: 'Ingeniería de Sistemas', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Desarrollo de sistemas de información con énfasis en gestión tecnológica y seguridad informática.' },
    { nombre: 'Comunicación Social', tipo: 'Universidad', area_academica: 'comunicacion', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Periodismo, producción multimedia y gestión de medios en entornos digitales.' },
    { nombre: 'Psicología', tipo: 'Universidad', area_academica: 'social', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Intervención clínica, organizacional y comunitaria basada en evidencia científica.' },
    { nombre: 'Arquitectura y Diseño', tipo: 'Universidad', area_academica: 'diseño', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Proyecto arquitectónico integrado con diseño de interiores y gestión urbana.' },
    { nombre: 'Enfermería', tipo: 'Universidad', area_academica: 'salud', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Cuidado integral de la salud del individuo, la familia y la comunidad.' },
    { nombre: 'Filosofía', tipo: 'Universidad', area_academica: 'humanidades', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Pensamiento crítico, ética y análisis de los grandes problemas del conocimiento humano.' },
  ],
  'Universidad EAFIT': [
    { nombre: 'Ingeniería de Sistemas', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '9 semestres', modalidad: 'Presencial', descripcion: 'Desarrollo de software empresarial, ciencia de datos y transformación digital de organizaciones.' },
    { nombre: 'Administración de Negocios', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Gestión empresarial con enfoque emprendedor e internacional para el contexto latinoamericano.' },
    { nombre: 'Música', tipo: 'Universidad', area_academica: 'arte', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Formación de músicos intérpretes y compositores con alto nivel técnico y sensibilidad artística.' },
    { nombre: 'Ingeniería de Producción', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '9 semestres', modalidad: 'Presencial', descripcion: 'Optimización de procesos industriales, logística y cadena de suministro.' },
    { nombre: 'Comunicación Social', tipo: 'Universidad', area_academica: 'comunicacion', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Gestión de medios, comunicación digital y producción de contenidos para marcas.' },
  ],
  'SENA - Servicio Nacional de Aprendizaje': [
    { nombre: 'Tecnología en Análisis y Desarrollo de Software', tipo: 'SENA', area_academica: 'tecnologia', duracion: '2 años', modalidad: 'Presencial', descripcion: 'Desarrollo de aplicaciones web y móviles, bases de datos y metodologías ágiles. 100% gratuito.' },
    { nombre: 'Tecnología en Gestión Empresarial', tipo: 'SENA', area_academica: 'negocios', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Administración de pequeñas y medianas empresas, contabilidad básica y talento humano.' },
    { nombre: 'Tecnología en Diseño Gráfico', tipo: 'SENA', area_academica: 'diseño', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Diseño editorial, identidad corporativa y producción de piezas para medios digitales.' },
    { nombre: 'Técnico en Cocina', tipo: 'SENA', area_academica: 'arte', duracion: '1 año', modalidad: 'Presencial', descripcion: 'Preparación de alimentos, gestión de cocina y técnicas culinarias nacionales e internacionales.' },
    { nombre: 'Tecnología en Salud Ocupacional', tipo: 'SENA', area_academica: 'salud', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Gestión de riesgos laborales, primeros auxilios y promoción de la salud en el trabajo.' },
    { nombre: 'Técnico en Instalaciones Eléctricas', tipo: 'SENA', area_academica: 'tecnologia', duracion: '1 año', modalidad: 'Presencial', descripcion: 'Instalación y mantenimiento de redes eléctricas residenciales, comerciales e industriales.' },
    { nombre: 'Tecnología en Gestión Ambiental', tipo: 'SENA', area_academica: 'ambiental', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Manejo de residuos, monitoreo ambiental y aplicación de normativa colombiana de medio ambiente.' },
    { nombre: 'Técnico en Atención Integral a la Primera Infancia', tipo: 'SENA', area_academica: 'educacion', duracion: '1 año', modalidad: 'Presencial', descripcion: 'Cuidado y estimulación de niños de 0 a 5 años con enfoque en desarrollo integral.' },
    { nombre: 'Tecnología en Comunicación Gráfica Publicitaria', tipo: 'SENA', area_academica: 'comunicacion', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Producción de piezas publicitarias para medios ATL, BTL y redes sociales.' },
    { nombre: 'Técnico en Deporte', tipo: 'SENA', area_academica: 'deporte', duracion: '1 año', modalidad: 'Presencial', descripcion: 'Entrenamiento deportivo, actividad física comunitaria y recreación terapéutica.' },
  ],
  'SENA Regional Antioquia': [
    { nombre: 'Tecnología en Análisis y Desarrollo de Software', tipo: 'SENA', area_academica: 'tecnologia', duracion: '2 años', modalidad: 'Presencial', descripcion: 'Programación, bases de datos y desarrollo de aplicaciones web. Completamente gratuito.' },
    { nombre: 'Técnico en Sistemas', tipo: 'SENA', area_academica: 'tecnologia', duracion: '1 año', modalidad: 'Presencial', descripcion: 'Mantenimiento de equipos de cómputo, redes LAN y soporte técnico a usuarios.' },
    { nombre: 'Tecnología en Gestión del Talento Humano', tipo: 'SENA', area_academica: 'administrativo', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Selección, contratación, bienestar laboral y desarrollo del personal en organizaciones.' },
  ],
  'SENA Regional Valle del Cauca': [
    { nombre: 'Técnico en Programación de Software', tipo: 'SENA', area_academica: 'tecnologia', duracion: '1 año', modalidad: 'Presencial', descripcion: 'Fundamentos de programación en Python, JavaScript y desarrollo de aplicaciones básicas.' },
    { nombre: 'Tecnología en Producción Multimedia', tipo: 'SENA', area_academica: 'comunicacion', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Producción de video, audio y contenidos digitales interactivos para distintas plataformas.' },
  ],
  'Universidad del Rosario': [
    { nombre: 'Jurisprudencia', tipo: 'Universidad', area_academica: 'juridico', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Una de las carreras de Derecho más reconocidas del país con énfasis en derecho internacional.' },
    { nombre: 'Medicina', tipo: 'Universidad', area_academica: 'salud', duracion: '12 semestres', modalidad: 'Presencial', descripcion: 'Formación médica integral con investigación clínica y práctica en hospitales universitarios.' },
    { nombre: 'Administración de Empresas', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Liderazgo corporativo, estrategia empresarial y gobierno corporativo con perspectiva global.' },
  ],
  'Universidad Externado de Colombia': [
    { nombre: 'Derecho', tipo: 'Universidad', area_academica: 'juridico', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Referente histórico en formación jurídica con énfasis en derecho penal, comercial y administrativo.' },
    { nombre: 'Economía', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Análisis económico aplicado a políticas públicas, mercados financieros y desarrollo social.' },
    { nombre: 'Comunicación Social y Periodismo', tipo: 'Universidad', area_academica: 'comunicacion', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Periodismo de investigación, comunicación digital y gestión de crisis mediáticas.' },
  ],
  'Instituto Tecnológico Metropolitano - ITM': [
    { nombre: 'Tecnología en Sistemas Informáticos', tipo: 'Tecnológica', area_academica: 'tecnologia', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Desarrollo de software, administración de redes y soporte técnico con enfoque práctico.' },
    { nombre: 'Tecnología en Electrónica', tipo: 'Tecnológica', area_academica: 'tecnologia', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Diseño y mantenimiento de sistemas electrónicos industriales y de automatización.' },
    { nombre: 'Tecnología en Gestión Administrativa', tipo: 'Tecnológica', area_academica: 'administrativo', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Administración eficiente de recursos organizacionales en el sector público y privado.' },
  ],
  'Politécnico Colombiano Jaime Isaza Cadavid': [
    { nombre: 'Tecnología en Informática', tipo: 'Tecnológica', area_academica: 'tecnologia', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Programación, bases de datos y gestión de infraestructura tecnológica empresarial.' },
    { nombre: 'Tecnología en Diseño Industrial', tipo: 'Tecnológica', area_academica: 'diseño', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Diseño de productos industriales con enfoque en manufactura, materiales y ergonomía.' },
    { nombre: 'Comunicación Gráfica', tipo: 'Tecnológica', area_academica: 'comunicacion', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Diseño editorial, identidad de marca y producción gráfica para medios impresos y digitales.' },
  ],
  'UNIMINUTO - Corporación Universitaria Minuto de Dios': [
    { nombre: 'Ingeniería de Sistemas', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Desarrollo de software con responsabilidad social, accesible para jóvenes de estratos 1, 2 y 3.' },
    { nombre: 'Trabajo Social', tipo: 'Universidad', area_academica: 'social', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Intervención comunitaria, gestión social y acompañamiento a poblaciones vulnerables.' },
    { nombre: 'Licenciatura en Educación Básica', tipo: 'Universidad', area_academica: 'educacion', duracion: '8 semestres', modalidad: 'Virtual', descripcion: 'Formación de docentes para educación básica primaria con enfoque en innovación pedagógica.' },
    { nombre: 'Administración de Empresas', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Virtual', descripcion: 'Emprendimiento y gestión empresarial accesible en modalidad virtual para todo el país.' },
  ],
  'Universidad Santo Tomás': [
    { nombre: 'Ingeniería de Sistemas', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Formación en ciencias de la computación con valores humanísticos y éticos dominicanos.' },
    { nombre: 'Psicología', tipo: 'Universidad', area_academica: 'social', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Psicología clínica, educativa y organizacional con enfoque humanista y comunitario.' },
    { nombre: 'Filosofía y Letras', tipo: 'Universidad', area_academica: 'humanidades', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Pensamiento filosófico, literatura y análisis del discurso con tradición tomista.' },
  ],
  'Universidad del Norte': [
    { nombre: 'Ingeniería de Sistemas', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Desarrollo tecnológico con enfoque en la Región Caribe y proyección internacional.' },
    { nombre: 'Medicina', tipo: 'Universidad', area_academica: 'salud', duracion: '12 semestres', modalidad: 'Presencial', descripcion: 'Formación médica con énfasis en salud tropical y enfermedades prevalentes en el Caribe colombiano.' },
    { nombre: 'Comunicación Social', tipo: 'Universidad', area_academica: 'comunicacion', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Periodismo digital, producción audiovisual y relaciones públicas con perspectiva regional.' },
    { nombre: 'Psicología', tipo: 'Universidad', area_academica: 'social', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Formación psicológica con énfasis en salud mental, organizaciones y neuropsicología.' },
  ],
  'Colegio Mayor de Cundinamarca': [
    { nombre: 'Tecnología en Gestión Comercial y de Negocios', tipo: 'Tecnológica', area_academica: 'negocios', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Ventas, marketing y gestión de negocios con formación práctica en el sector real.' },
    { nombre: 'Trabajo Social', tipo: 'Tecnológica', area_academica: 'social', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Intervención social con comunidades y familias en el contexto bogotano y regional.' },
    { nombre: 'Turismo', tipo: 'Tecnológica', area_academica: 'administrativo', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Gestión de destinos turísticos, hotelería y patrimonio cultural colombiano.' },
  ],
  'CESDE Formación Técnica': [
    { nombre: 'Técnico Laboral en Auxiliar de Enfermería', tipo: 'Técnica', area_academica: 'salud', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Asistencia en cuidados básicos de salud, aplicación de medicamentos y atención al paciente.' },
    { nombre: 'Técnico Laboral en Diseño Gráfico', tipo: 'Técnica', area_academica: 'diseño', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Herramientas de diseño digital, fotografía básica e identidad corporativa para pymes.' },
    { nombre: 'Técnico Laboral en Programación de Software', tipo: 'Técnica', area_academica: 'tecnologia', duracion: '18 meses', modalidad: 'Presencial', descripcion: 'Introducción a la programación web, JavaScript y desarrollo de aplicaciones básicas.' },
  ],
  'Universidad de La Sabana': [
    { nombre: 'Psicología', tipo: 'Universidad', area_academica: 'social', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Psicología con enfoque personalista, con aplicaciones en clínica, organizaciones y educación.' },
    { nombre: 'Comunicación Audiovisual y Multimedios', tipo: 'Universidad', area_academica: 'comunicacion', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Producción audiovisual, storytelling digital y gestión de contenidos para marcas.' },
    { nombre: 'Medicina', tipo: 'Universidad', area_academica: 'salud', duracion: '12 semestres', modalidad: 'Presencial', descripcion: 'Medicina con enfoque humanístico, investigación clínica y práctica en hospital universitario.' },
  ],
  'Universidad Distrital Francisco José de Caldas': [
    { nombre: 'Ingeniería de Sistemas', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Universidad pública de Bogotá con fuerte énfasis en software libre y tecnologías abiertas.' },
    { nombre: 'Licenciatura en Pedagogía Infantil', tipo: 'Universidad', area_academica: 'educacion', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Formación de maestros para educación inicial con enfoque en diversidad e inclusión.' },
    { nombre: 'Artes Musicales', tipo: 'Universidad', area_academica: 'arte', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Interpretación musical, composición y gestión cultural en el contexto colombiano.' },
  ],
  'Universidad Sergio Arboleda': [
    { nombre: 'Derecho', tipo: 'Universidad', area_academica: 'juridico', duracion: '10 semestres', modalidad: 'Presencial', descripcion: 'Formación jurídica con énfasis en abogacía corporativa y litigación civil y comercial.' },
    { nombre: 'Ingeniería de Sistemas', tipo: 'Universidad', area_academica: 'tecnologia', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Desarrollo de software con doble perfil tecnológico y de negocios digitales.' },
    { nombre: 'Marketing y Negocios Internacionales', tipo: 'Universidad', area_academica: 'negocios', duracion: '8 semestres', modalidad: 'Presencial', descripcion: 'Estrategia de marketing digital, comercio exterior y negocios en mercados globales.' },
  ],
  'Institución Universitaria Pascual Bravo': [
    { nombre: 'Tecnología en Desarrollo de Software', tipo: 'Tecnológica', area_academica: 'tecnologia', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Programación orientada a objetos, desarrollo web y aplicaciones móviles con enfoque práctico.' },
    { nombre: 'Tecnología en Mecatrónica', tipo: 'Tecnológica', area_academica: 'tecnologia', duracion: '6 semestres', modalidad: 'Presencial', descripcion: 'Integración de sistemas mecánicos, electrónicos y computacionales para automatización industrial.' },
  ],
};

async function seed() {
  console.log('🌱 Iniciando seed de instituciones y programas...\n');

  // 1. Verificar si ya hay datos
  const { count: countInst } = await supabase.from('instituciones').select('*', { count: 'exact', head: true });
  if (countInst > 0) {
    console.log(`⚠️  Ya hay ${countInst} instituciones en la BD.`);
    console.log('   Para evitar duplicados, solo se insertarán las que no existan.\n');
  }

  // 2. Insertar solo las instituciones que no existan aún
  console.log('📍 Insertando instituciones...');
  const { data: existentes } = await supabase.from('instituciones').select('nombre');
  const nombresExistentes = new Set((existentes ?? []).map(i => i.nombre));
  const instNuevas = INSTITUCIONES.filter(i => !nombresExistentes.has(i.nombre));

  if (instNuevas.length > 0) {
    const { error: errInst } = await supabase.from('instituciones').insert(instNuevas);
    if (errInst) {
      console.error('❌ Error insertando instituciones:', errInst.message);
      process.exit(1);
    }
    console.log(`   Insertadas ${instNuevas.length} nuevas.`);
  } else {
    console.log('   Todas las instituciones ya existen.');
  }

  // 3. Obtener todas las instituciones con sus IDs
  const { data: todasLasInst } = await supabase.from('instituciones').select('id, nombre');
  const mapaInst = {};
  todasLasInst.forEach(i => { mapaInst[i.nombre] = i.id; });

  console.log(`✅ ${todasLasInst.length} instituciones en la BD\n`);

  // 4. Construir lista de programas con institucion_id
  const programasParaInsertar = [];
  for (const [nombreInst, programas] of Object.entries(PROGRAMAS_POR_INST)) {
    const instId = mapaInst[nombreInst];
    if (!instId) {
      console.warn(`⚠️  No se encontró ID para: ${nombreInst}`);
      continue;
    }
    programas.forEach(p => {
      programasParaInsertar.push({ ...p, institucion_id: instId, activo: true });
    });
  }

  // 5. Filtrar programas ya existentes y insertar en lotes de 20
  const { data: progExistentes } = await supabase
    .from('programas').select('nombre, institucion_id');
  const progSet = new Set((progExistentes ?? []).map(p => `${p.nombre}::${p.institucion_id}`));
  const progNuevos = programasParaInsertar.filter(
    p => !progSet.has(`${p.nombre}::${p.institucion_id}`)
  );

  console.log(`📚 Insertando ${progNuevos.length} programas nuevos (de ${programasParaInsertar.length} total)...`);
  const LOTE = 20;

  for (let i = 0; i < progNuevos.length; i += LOTE) {
    const lote = progNuevos.slice(i, i + LOTE);
    const { error: errProg } = await supabase.from('programas').insert(lote);
    if (errProg) {
      console.warn(`   ⚠️  Lote ${Math.floor(i/LOTE)+1}: ${errProg.message}`);
    } else {
      process.stdout.write(`   Lote ${Math.floor(i/LOTE)+1}/${Math.ceil(progNuevos.length/LOTE)} ✓\n`);
    }
  }

  // 6. Resumen final
  const { count: countProg } = await supabase.from('programas').select('*', { count: 'exact', head: true });
  const { count: countFinalInst } = await supabase.from('instituciones').select('*', { count: 'exact', head: true });

  console.log('\n══════════════════════════════════════');
  console.log(`✅ Seed completado`);
  console.log(`   Instituciones en BD: ${countFinalInst}`);
  console.log(`   Programas en BD:     ${countProg}`);
  console.log('══════════════════════════════════════\n');
}

seed().catch(err => {
  console.error('Error fatal:', err);
  process.exit(1);
});
