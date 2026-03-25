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

User <|-- Student : Is a
User <|-- Administrator : Is a

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
%% RELATIONSHIPS
%% ========================================

Questionnaire "1" *-- "many" Question : is composed of
Result "1" *-- "many" Recommendation : contains
Program "1" *-- "many" AdmissionCall : offers

Institution "1" o-- "many" Program : groups

Student "1" --> "many" Result : takes
Student "many" --> "many" Questionnaire : answers

Program "many" --> "1" StudyArea : belongs to
Recommendation "many" --> "1" Program : suggests
Question "many" <-- "1" Result : contains answers for

%% ========================================
%% SERVICES
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

EvaluationService ..> Result : creates
RecommendationEngineService ..> Result : analyzes
RecommendationEngineService ..> Recommendation : generates
