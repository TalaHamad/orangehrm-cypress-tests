Feature: OrangeHRM  Recruitment Process

    Scenario: Data Preparation
        Given The system has a hiring manager
        And The system has a job title
        And The system has a vacancy
        And I have a candidate with application initiated status
        When I shortlist the candidate with note "Cypress Test Shortlist Note"
        And I schedule the first interview for this candidate
        And I mark the first interview as faild with note "Cypress Interview Failed"
        And I mark the first interview as passed with note "Cypress Interview Passed"
        And I offer a job
        And I schedule interview from interview passed
        And I hired the candidate
        And I decline the job offer



