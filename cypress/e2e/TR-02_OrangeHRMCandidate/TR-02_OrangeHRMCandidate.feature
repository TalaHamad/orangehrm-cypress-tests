Feature: OrangeHRM Recruitment Process

    Background:
        Given The system has a hiring manager
        And The system has a job title
        And The system has a vacancy

    # Application Initiated Status
    Scenario: 1 - Reject candidate from Application Initiated
        Given A candidate exists with Application Initiated status
        When The candidate is rejected with note "Not meeting basic requirements"
        Then The candidate status should be "Rejected"

    Scenario: 2 - Shortlist candidate from Application Initiated
        Given A candidate exists with Application Initiated status
        When The candidate is shortlisted with note "Good profile match"
        Then The candidate status should be "Shortlisted"

    # Shortlisted Status
    Scenario: 3 - Reject candidate from Shortlisted
        Given A candidate exists with Shortlisted status
        When The candidate is rejected with note "Better candidate available"
        Then The candidate status should be "Rejected"

    Scenario: 4 - Schedule interview from Shortlisted (first interview)
        Given A candidate exists with Shortlisted status
        When The first interview is scheduled for the candidate with note "First round technical interview"
        Then The candidate status should be "Interview Scheduled"

    # Interview Scheduled Status (First Interview)
    Scenario: 5 - Reject candidate from First Interview Scheduled
        Given A candidate exists with Interview Scheduled status
        When The candidate is rejected with note "Candidate withdrew application"
        Then The candidate status should be "Rejected"

    Scenario: 6 - Mark interview as failed from First Interview Scheduled
        Given A candidate exists with Interview Scheduled status
        When The first interview is marked as failed with note "Technical skills below expectations"
        Then The candidate status should be "Interview Failed"

    Scenario: 7 - Mark interview as passed from First Interview Scheduled
        Given A candidate exists with Interview Scheduled status
        When The first interview is marked as passed with note "Excellent technical performance"
        Then The candidate status should be "Interview Passed"

    # Interview Failed Status
    Scenario: 8 - Reject candidate from First Interview Failed
        Given A candidate exists with Interview Failed status
        When The candidate is rejected with note "Failed technical assessment"
        Then The candidate status should be "Rejected"

    # Interview Passed Status
    Scenario: 9 - Reject candidate from First Interview Passed
        Given A candidate exists with Interview Passed status
        When The candidate is rejected with note "Position put on hold"
        Then The candidate status should be "Rejected"

    Scenario: 10 - Schedule interview from First Interview Passed
        Given A candidate exists with Interview Passed status
        When The second interview is scheduled for the candidate with note "Second round managerial interview"
        Then The candidate status should be "Interview Scheduled"

    Scenario: 11 - Offer job from First Interview Passed
        Given A candidate exists with Interview Passed status
        When A job is offered to the candidate with note "Direct offer after excellent first interview"
        Then The candidate status should be "Job Offered"

    # Second Interview Scheduled Status
    Scenario: 12 - Reject candidate from Second Interview Scheduled
        Given A candidate exists with Interview Scheduled status after first interview passed
        When The candidate is rejected with note "Candidate accepted another offer"
        Then The candidate status should be "Rejected"

    Scenario: 13 - Reject candidate from Second Interview Failed
        Given A candidate exists with Interview Failed status after second interview
        When The candidate is rejected with note "Failed second round interview"
        Then The candidate status should be "Rejected"

    Scenario: 14 - Mark interview as failed from Second Interview Scheduled
        Given A candidate exists with Interview Scheduled status after first interview passed
        When The second interview is marked as failed with note "Poor cultural fit"
        Then The candidate status should be "Interview Failed"

    Scenario: 15 - Mark interview as passed from Second Interview Scheduled
        Given A candidate exists with Interview Scheduled status after first interview passed
        When The second interview is marked as passed with note "Excellent performance in all rounds"
        Then The candidate status should be "Interview Passed"

    # Second Interview Passed Status
    Scenario: 16 - Reject candidate from Second Interview Passed
        Given A candidate exists with Interview Passed status after second interview
        When The candidate is rejected with note "Budget constraints"
        Then The candidate status should be "Rejected"

    Scenario: 17 - Offer job from Second Interview Passed
        Given A candidate exists with Interview Passed status after second interview
        When A job is offered to the candidate with note "Successful completion of all interview rounds"
        Then The candidate status should be "Job Offered"

    # Job Offered Status
    Scenario: 18 - Reject candidate from Job Offered
        Given A candidate exists with Job Offered status
        When The candidate is rejected with note "Failed background check"
        Then The candidate status should be "Rejected"

    Scenario: 19 - Offer declined from Job Offered
        Given A candidate exists with Job Offered status
        When The offer is marked as declined with note "Candidate declined our offer"
        Then The candidate status should be "Offer Declined"

    Scenario: 20 - Hire from Job Offered
        Given A candidate exists with Job Offered status
        When The candidate is hired with note "Candidate accepted the offer"
        Then The candidate status should be "Hired"

    # Offer Declined Status
    Scenario: 21 - Reject candidate from Offer Declined
        Given A candidate exists with Offer Declined status
        When The candidate is rejected with note "Candidate declined our offer"
        Then The candidate status should be "Rejected"
