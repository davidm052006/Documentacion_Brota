# UML Class Diagram - Layered Architecture (Brota System)

Below is the class diagram modeling the main domain entities of the **Brota System**, as well as the relationships between them according to Object-Oriented Programming (OOP) principles. It also includes an abstraction of the services layer (Business Logic) required for the multi-layered architecture.

This diagram has been adapted to reflect the current data structure (such as `StudyArea`, the student profile redesign, and Institutions).

```mermaid
classDiagram
    %% ========================================
    %% 1. DOMAIN LAYER - ENTITIES AND INHERITANCE
    %% ========================================
    
    class User {
      <<Entity>>
      -UUID id
      -String email
      -String passwordHash
      -String role
      -DateTime createdAt
      +login(String email, String pwd) Boolean
      +logout() void
      +changePassword(String newPwd) Boolean
    }

    class Student {
      <<Entity>>
      -String firstName
      -String middleName
      -String lastName
      -String secondLastName
      -Integer age
      -String educationalLevel
      -JSONB socioeconomicConditions
      +startQuestionnaire(Questionnaire q) void
      +viewRecommendations() List~Recommendation~
      +updateFutureOptions() void
    }

    class Administrator {
      <<Entity>>
      -String position
      +createInstitution(Institution i) Institution
      +openAdmissionCall(Program p, AdmissionCall c) void
      +manageStudyArea(StudyArea a) void
    }

    %% INHERITANCE
    User <|-- Student : Is a
    User <|-- Administrator : Is a

    %% ========================================
    %% 2. MAIN BUSINESS ENTITIES
    %% ========================================
    
    class Questionnaire {
      <<Entity>>
      -UUID id
      -String name
      -String version
      -Boolean isActive
      +getActiveQuestions() List~Question~
      +cloneForNewVersion() Questionnaire
    }

    class Question {
      <<Entity>>
      -UUID id
      -String text
      -String type
      -Integer order
      -String category
      -Float weight
      -JSONB options
      +validateOptionsStructure() Boolean
    }

    class Result {
      <<Entity>>
      -UUID id
      -JSONB answers
      -JSONB vocationalProfile
      -DateTime takenAt
      +getAffinity(String area) Float
      +exportPDF() File
    }

    class Institution {
      <<Entity>>
      -UUID id
      -String name
      -String type
      -String city
      -String address
      -Boolean isActive
      +addProgram(Program p) void
      +deactivate() void
    }

    class StudyArea {
      <<Entity>>
      -UUID id
      -String name
      -String description
      -String icon
      -Boolean isActive
      +countAssociatedPrograms() Integer
    }

    class Program {
      <<Entity>>
      -UUID id
      -String name
      -String type
      -String duration
      -String modality
      -Integer tuitionFee
      -JSONB compatibleProfile
      -Boolean isActive
      +checkAdmissionCalls() List~AdmissionCall~
    }

    class AdmissionCall {
      <<Entity>>
      -UUID id
      -String name
      -Date openingDate
      -Date closingDate
      -Integer quota
      -Boolean isActive
      +isCurrentlyActive() Boolean
      +daysUntilClosing() Integer
    }

    class Recommendation {
      <<Entity>>
      -UUID id
      -Float compatibility
      -String reasons
      -Boolean isViewed
      +markAsViewed() void
    }

    %% ========================================
    %% RELATIONSHIPS (Associations, Aggregations, Compositions)
    %% ========================================
    
    %% Composition (The whole destroys the part)
    Questionnaire "1" *-- "many" Question : is composed of
    Result "1" *-- "many" Recommendation : contains
    Program "1" *-- "many" AdmissionCall : offers
    
    %% Aggregation (The part can exist without the whole)
    Institution "1" o-- "many" Program : groups
    
    %% Simple Association (Logical relationships or references)
    Student "1" --> "many" Result : takes
    Program "many" --> "1" StudyArea : belongs to
    Recommendation "many" --> "1" Program : suggests
    Question "many" <-- "1" Result : contains answers for

    %% ========================================
    %% 3. BUSINESS AND SERVICES LAYER
    %% ========================================
    
    class EvaluationService {
      <<Service>>
      -QuestionnaireRepository repo
      +processAnswers(UUID studentId, JSON answers) Profile
      -calculateWeightsByArea(List answers) Map
    }

    class RecommendationEngineService {
      <<Service>>
      -ProgramRepository repoProgram
      +generateRecommendations(Result res) List~Recommendation~
      +crossProfileWithPrograms(JSON profile) List~Program~
    }

    %% DEPENDENCIES (Indicates the use of the class in the flow)
    EvaluationService ..> Result : creates
    RecommendationEngineService ..> Result : analyzes
    RecommendationEngineService ..> Recommendation : generates
```

## Quick Explanation of Relationships

1. **Inheritance (White triangle):** `Student` and `Administrator` inherit the base characteristics and ID from `User`. In Supabase, this translates to the external `auth.users` table connected to the `perfiles_usuario` (user profiles) table.
2. **Composition (Black diamond):** Indicates strict dependency. If you delete a `Questionnaire`, the `Question`s that compose it also disappear (Cascade Delete). The same occurs between `Program` and `AdmissionCall`, and `Result` with `Recommendation`.
3. **Aggregation (White diamond):** An `Institution` groups several `Program`s, but if the program is closed, the institution still exists.
4. **Association (Simple line):** Reflects looser logical references. For example, a `Recommendation` suggests a `Program`, a `Program` belongs to a `StudyArea`, and a `Result` internally stores the answers connected to multiple `Question`s.
5. **Dependency (Dotted line):** Used in the service layers to show which components need others to function. For example, `RecommendationEngineService` depends on analyzing a `Result` to infer compatibility and then generate the `Recommendation` instances.

**UML Attribute Visibility (Symbols):**
- `-` Private (Accessed via methods/encapsulation).
- `+` Public.
- `#` Protected (For child classes).
