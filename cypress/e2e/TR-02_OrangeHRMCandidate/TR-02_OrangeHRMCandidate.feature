Feature: OrangeHRM Recruitment Process

    Background:
        Given the system has a hiring manager
        And the system has a job title
        And the system has a vacancy

    # Application Initiated Status
    Scenario: 1 - Reject candidate from Application Initiated
        Given a candidate exists with Application Initiated status
        When the candidate is rejected with note "Not meeting basic requirements"
        Then the candidate status should be "Rejected"

    Scenario: 2 - Shortlist candidate from Application Initiated
        Given a candidate exists with Application Initiated status
        When the candidate is shortlisted with note "Good profile match"
        Then the candidate status should be "Shortlisted"

    # Shortlisted Status
    Scenario: 3 - Reject candidate from Shortlisted
        Given a candidate exists with Shortlisted status
        When the candidate is rejected with note "Better candidate available"
        Then the candidate status should be "Rejected"

    Scenario: 4 - Schedule interview from Shortlisted (first interview)
        Given a candidate exists with Shortlisted status
        When the first interview is scheduled for the candidate with note "First round technical interview"
        Then the candidate status should be "Interview Scheduled"

    # Interview Scheduled Status (First Interview)
    Scenario: 5 - Reject candidate from First Interview Scheduled
        Given a candidate exists with Interview Scheduled status
        When the candidate is rejected with note "Candidate withdrew application"
        Then the candidate status should be "Rejected"

    Scenario: 6 - Mark interview as failed from First Interview Scheduled
        Given a candidate exists with Interview Scheduled status
        When the first interview is marked as failed with note "Technical skills below expectations"
        Then the candidate status should be "Interview Failed"

    Scenario: 7 - Mark interview as passed from First Interview Scheduled
        Given a candidate exists with Interview Scheduled status
        When the first interview is marked as passed with note "Excellent technical performance"
        Then the candidate status should be "Interview Passed"

    # Interview Failed Status
    Scenario: 8 - Reject candidate from First Interview Failed
        Given a candidate exists with Interview Failed status
        When the candidate is rejected with note "Failed technical assessment"
        Then the candidate status should be "Rejected"

    # Interview Passed Status
    Scenario: 9 - Reject candidate from First Interview Passed
        Given a candidate exists with Interview Passed status
        When the candidate is rejected with note "Position put on hold"
        Then the candidate status should be "Rejected"

    Scenario: 10 - Schedule interview from First Interview Passed
        Given a candidate exists with Interview Passed status
        When the second interview is scheduled for the candidate with note "Second round managerial interview"
        Then the candidate status should be "Interview Scheduled"

    Scenario: 11 - Offer job from First Interview Passed
        Given a candidate exists with Interview Passed status
        When a job is offered to the candidate with note "Direct offer after excellent first interview"
        Then the candidate status should be "Job Offered"

    # Second Interview Scheduled Status
    Scenario: 12 - Reject candidate from Second Interview Scheduled
        Given a candidate exists with Interview Scheduled status after first interview passed
        When the candidate is rejected with note "Candidate accepted another offer"
        Then the candidate status should be "Rejected"

    Scenario: 13 - Reject candidate from Second Interview Failed
        Given a candidate exists with Interview Failed status after second interview
        When the candidate is rejected with note "Failed second round interview"
        Then the candidate status should be "Rejected"

    Scenario: 14 - Mark interview as failed from Second Interview Scheduled
        Given a candidate exists with Interview Scheduled status after first interview passed
        When the second interview is marked as failed with note "Poor cultural fit"
        Then the candidate status should be "Interview Failed"

    Scenario: 15 - Mark interview as passed from Second Interview Scheduled
        Given a candidate exists with Interview Scheduled status after first interview passed
        When the second interview is marked as passed with note "Excellent performance in all rounds"
        Then the candidate status should be "Interview Passed"

    # Second Interview Passed Status
    Scenario: 16 - Reject candidate from Second Interview Passed
        Given a candidate exists with Interview Passed status after second interview
        When the candidate is rejected with note "Budget constraints"
        Then the candidate status should be "Rejected"

    Scenario: 17 - Offer job from Second Interview Passed
        Given a candidate exists with Interview Passed status after second interview
        When a job is offered to the candidate with note "Successful completion of all interview rounds"
        Then the candidate status should be "Job Offered"

    # Job Offered Status
    Scenario: 18 - Reject candidate from Job Offered
        Given a candidate exists with Job Offered status
        When the candidate is rejected with note "Failed background check"
        Then the candidate status should be "Rejected"

    Scenario: 19 - Offer declined from Job Offered
        Given a candidate exists with Job Offered status
        When the offer is marked as declined with note "Candidate declined our offer"
        Then the candidate status should be "Offer Declined"

    Scenario: 20 - Hire from Job Offered
        Given a candidate exists with Job Offered status
        When the candidate is hired with note "Candidate accepted the offer"
        Then the candidate status should be "Hired"

    # Offer Declined Status
    Scenario: 21 - Reject candidate from Offer Declined
        Given a candidate exists with Offer Declined status
        When the candidate is rejected with note "Candidate declined our offer"
        Then the candidate status should be "Rejected"
