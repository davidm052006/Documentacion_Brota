# Diagrama de Clases UML - Arquitectura en Capas (Sistema Brota)

A continuación se presenta el diagrama de clases modelando las entidades principales del dominio del **Sistema Brota**, así como las relaciones entre ellas según los principios de la Programación Orientada a Objetos (POO). También se incluye una abstracción de la capa de servicios (Lógica de Negocio) requerida para la arquitectura multicapa.

Este diagrama ha sido adaptado reflejando la estructura actual de los datos (como `AreaEstudio`, el rediseño de perfil de estudiante, e Instituciones).

```mermaid
classDiagram
    %% ========================================
    %% 1. CAPA DE DOMINIO - ENTIDADES Y HERENCIA
    %% ========================================
    
    class Usuario {
      <<Entity>>
      -UUID id
      -String email
      -String passwordHash
      -String rol
      -DateTime fechaCreacion
      +login(String email, String pwd) Boolean
      +logout() void
      +cambiarPassword(String newPwd) Boolean
    }

    class Estudiante {
      <<Entity>>
      -String primerNombre
      -String primerApellido
      -Integer edad
      -String nivelEducativo
      -JSONB condicionesSocioeconomicas
      +iniciarCuestionario(Cuestionario c) void
      +verRecomendaciones() List~Recomendacion~
      +actualizarOpcionesFuturo() void
    }

    class Administrador {
      <<Entity>>
      -String cargo
      +crearInstitucion(Institucion i) Institucion
      +abrirConvocatoria(Programa p, Convocatoria c) void
      +gestionarAreaEstudio(AreaEstudio a) void
    }

    %% HERENCIA
    Usuario <|-- Estudiante : Es un (Inheritance)
    Usuario <|-- Administrador : Es un (Inheritance)

    %% ========================================
    %% 2. ENTIDADES PRINCIPALES DEL NEGOCIO
    %% ========================================
    
    class Cuestionario {
      <<Entity>>
      -UUID id
      -String nombre
      -String version
      -Boolean activo
      +obtenerPreguntasActivas() List~Pregunta~
      +clonarParaNuevaVersion() Cuestionario
    }

    class Pregunta {
      <<Entity>>
      -UUID id
      -String texto
      -String tipo
      -Integer orden
      -String categoria
      +validarEstructuraOpciones() Boolean
    }

    class Resultado {
      <<Entity>>
      -UUID id
      -JSONB respuestas
      -JSONB perfilVocacional
      -DateTime fechaRealizacion
      +obtenerAfinidad(String area) Float
      +exportarPDF() File
    }

    class Institucion {
      <<Entity>>
      -UUID id
      -String nombre
      -String tipo
      -String direccion
      -Boolean activa
      +agregarPrograma(Programa p) void
      +desactivar() void
    }

    class AreaEstudio {
      <<Entity>>
      -UUID id
      -String nombre
      -String descripcion
      -String icono
      +contarProgramasAsociados() Integer
    }

    class Programa {
      <<Entity>>
      -UUID id
      -String nombre
      -String modalidad
      -Integer costoMatricula
      -JSONB perfilCompatible
      +verificarConvocatorias() List~Convocatoria~
    }

    class Convocatoria {
      <<Entity>>
      -UUID id
      -String nombre
      -Date fechaApertura
      -Date fechaCierre
      +estaVigente() Boolean
      +diasParaCierre() Integer
    }

    class Recomendacion {
      <<Entity>>
      -UUID id
      -Float compatibilidad
      -String razones
      -Boolean vista
      +marcarComoVista() void
    }

    %% ========================================
    %% RELACIONES (Asociaciones, Agregaciones, Composiciones)
    %% ========================================
    
    %% Composición (El todo destruye a la parte)
    Cuestionario "1" *-- "many" Pregunta : está compuesto por
    Resultado "1" *-- "many" Recomendacion : contiene
    Programa "1" *-- "many" Convocatoria : oferta
    
    %% Agregación (La parte puede existir sin el todo)
    Institucion "1" o-- "many" Programa : agrupa
    
    %% Asociación Simple (Relaciones lógicas o referencias)
    Estudiante "1" --> "many" Resultado : realiza
    Programa "many" --> "1" AreaEstudio : pertenece a
    Recomendacion "many" --> "1" Programa : sugiere

    %% ========================================
    %% 3. CAPA DE NEGOCIO Y SERVICIOS
    %% ========================================
    
    class EvaluacionService {
      <<Service>>
      -CuestionarioRepository repo
      +procesarRespuestas(UUID estudianteId, JSON respuestas) Perfil
      -calcularPesosPorArea(List respuestas) Map
    }

    class MotorRecomendacionService {
      <<Service>>
      -ProgramaRepository repoPrograma
      +generarRecomendaciones(Resultado res) List~Recomendacion~
      +cruzarPerfilConProgramas(JSON perfil) List~Programa~
    }

    %% DEPENDENCIAS (Indica el uso de la clase en el flujo)
    EvaluacionService ..> Resultado : crea
    MotorRecomendacionService ..> Recomendacion : genera
```

## Explicación Rápida de las Relaciones

1. **Herencia (Triángulo blanco):** `Estudiante` y `Administrador` heredan las características base y el ID de `Usuario`. En la base de datos Supabase esto se traduce a la tabla `auth.users` conectada `perfiles_usuario`.
2. **Composición (Rombo negro):** Indica dependencia estricta. Si borras un `Cuestionario`, las `Pregunta`s que lo componen también desaparecen (Cascade Delete en BD). Lo mismo pasa entre `Programa` y `Convocatoria`.
3. **Agregación (Rombo blanco):** Una `Institucion` agrupa varios `Programa`s académicos, pero conceptualmente si cerramos el programa, la universidad/institución sigue existiendo.
4. **Asociación (Línea simple):** Refleja referencias de dependencias más sueltas, por ejemplo que una `Recomendacion` sugiere un `Programa` específico de cierta `AreaEstudio`. 
5. **Dependencia (Línea punteada):** Utilizada en las capas de servicios para mostrar que `EvaluacionService` "instancia" o "usa" la clase `Resultado` al evaluarlos, pero no son propiedades estáticas.

**Visibilidad de Atributos UML (Símbolos):**
- `-` Privado (Accedidos vía métodos/encapsulamiento).
- `+` Público.
- `#` Protegido (Para clases hijas).
