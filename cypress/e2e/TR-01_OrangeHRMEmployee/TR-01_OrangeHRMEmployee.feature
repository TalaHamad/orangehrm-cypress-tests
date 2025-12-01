Feature: OrangeHRM Employees
    Scenario: Create and delete an employee via API
        Given the system has a hiring manager
        And the system has a job title
        And the system has a vacancy
        And the system has a candidate
        When that candidate is deleted
        And that vacancy is deleted
        And that job title is deleted
        And that hiring manager is deleted


