classDiagram

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
}

User <|-- Student
User <|-- Administrator

class Questionnaire {
  <<Entity>>
}

class Question {
  <<Entity>>
}

class Result {
  <<Entity>>
}

class Institution {
  <<Entity>>
}

class StudyArea {
  <<Entity>>
}

class Program {
  <<Entity>>
}

class AdmissionCall {
  <<Entity>>
}

class Recommendation {
  <<Entity>>
}

%% RELATIONSHIPS (FIXED)

Questionnaire "1" *-- "*" Question
Result "1" *-- "*" Recommendation
Program "1" *-- "*" AdmissionCall

Institution "1" o-- "*" Program

Student "1" --> "*" Result
Student "*" --> "*" Questionnaire   %% 👈 TU LÍNEA

Program "*" --> "1" StudyArea
Recommendation "*" --> "1" Program
Question "*" <-- "1" Result
