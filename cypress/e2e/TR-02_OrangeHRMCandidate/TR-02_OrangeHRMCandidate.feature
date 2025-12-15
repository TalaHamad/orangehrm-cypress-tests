Feature: OrangeHRM Recruitment Process

    Background:
        Given The system has a hiring manager
        And The system has a job title
        And The system has a vacancy

    # Application Initiated Status
    Scenario: 1 - Reject candidate from Application Initiated
        Given A candidate is displayed on the candidate details page with Application Initiated status
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Not meeting basic requirements" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    Scenario: 01 - Cancel rejecting a candidate from Application Initiated
        Given A candidate is displayed on the candidate details page with Application Initiated status
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Not meeting basic requirements" is entered
        And The action is canceled
        Then The system should be redirected to the candidate details page and the status of the candidate should remain "Application Initiated"

    Scenario: 2 - Shortlist candidate from Application Initiated
        Given A candidate is displayed on the candidate details page with Application Initiated status
        When The "Shortlist" button is clicked
        And The "Shortlist Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Good profile match" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Shortlisted"
    # Shortlisted Status

    Scenario: 3- Reject candidate from Shortlisted
        Given A candidate is displayed on the candidate details page with Shortlisted status
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Better candidate available" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    Scenario: 4- Schedule first interview for a Shortlisted candidate
        Given A candidate is displayed on the candidate details page with Shortlisted status
        When The "Schedule Interview" button is clicked
        And The "Schedule Interview" form is displayed with candidate information on the Candidate Change Status Page
        And The note "First round technical interview" is entered
        And The interview details is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Interview Scheduled"

    # Interview Scheduled Status (First Interview)
    Scenario: 5 - Reject candidate from First Interview Scheduled
        Given A candidate is displayed on the candidate details page with Interview Scheduled status
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Candidate withdrew application" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    Scenario: 6 - Mark interview as failed from First Interview Scheduled
        Given A candidate is displayed on the candidate details page with Interview Scheduled status
        When The "Mark Interview Failed" button is clicked
        And The "Mark Interview Failed" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Technical skills below expectations" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Interview Failed"

    Scenario: 7 - Mark interview as passed from First Interview Scheduled
        Given A candidate is displayed on the candidate details page with Interview Scheduled status
        When The "Mark Interview Passed" button is clicked
        And The "Mark Interview Passed" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Excellent technical performance" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Interview Passed"

    # Interview Failed Status
    Scenario: 8 - Reject candidate from First Interview Failed
        Given A candidate is displayed on the candidate details page with Interview Failed status
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Failed technical assessment" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    # Interview Passed Status
    Scenario: 9 - Reject candidate from First Interview Passed
        Given A candidate is displayed on the candidate details page with Interview Passed status
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Position put on hold" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    Scenario: 10 - Schedule interview from First Interview Passed
        Given A candidate is displayed on the candidate details page with Interview Passed status
        When The "Schedule Interview" button is clicked
        And The "Schedule Interview" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Second round managerial interview" is entered
        And The interview details is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Interview Scheduled"

    Scenario: 11 - Offer job from First Interview Passed
        Given A candidate is displayed on the candidate details page with Interview Passed status
        When The "Offer Job" button is clicked
        And The "Offer Job" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Direct offer after excellent first interview" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Job Offered"

    # Second Interview Scheduled Status
    Scenario: 12 - Reject candidate from Second Interview Scheduled
        Given A candidate is displayed on the candidate details page with Interview Scheduled status after first interview passed
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Candidate accepted another offer" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    Scenario: 13 - Mark interview as failed from Second Interview Scheduled
        Given A candidate is displayed on the candidate details page with Interview Scheduled status after first interview passed
        When The "Mark Interview Failed" button is clicked
        And The "Mark Interview Failed" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Poor cultural fit" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Interview Failed"

    Scenario: 14 - Mark interview as passed from Second Interview Scheduled
        Given A candidate is displayed on the candidate details page with Interview Scheduled status after first interview passed
        When The "Mark Interview Passed" button is clicked
        And The "Mark Interview Passed" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Excellent performance in all rounds" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Interview Passed"

    Scenario: 15 - Reject candidate from Second Interview Failed
        Given A candidate is displayed on the candidate details page with Interview Failed status after second interview
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Failed second round interview" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    # Second Interview Passed Status
    Scenario: 16 - Reject candidate from Second Interview Passed
        Given A candidate is displayed on the candidate details page with Interview Passed status after second interview
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Budget constraints" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    Scenario: 17 - Offer job from Second Interview Passed
        Given A candidate is displayed on the candidate details page with Interview Passed status after second interview
        When The "Offer Job" button is clicked
        And The "Offer Job" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Successful completion of all interview rounds" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Job Offered"

    # Job Offered Status
    Scenario: 18 - Reject candidate from Job Offered
        Given A candidate is displayed on the candidate details page with Job Offered status
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Failed background check" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

    Scenario: 19 - Offer declined from Job Offered
        Given A candidate is displayed on the candidate details page with Job Offered status
        When The "Offer Declined" button is clicked
        And The "Decline Offer" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Candidate declined our offer" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Offer Declined"

    Scenario: 20 - Hire from Job Offered
        Given A candidate is displayed on the candidate details page with Job Offered status
        When The "Hire" button is clicked
        And The "Hire Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Candidate accepted the offer" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Hired"

    # Offer Declined Status
    Scenario: 21 - Reject candidate from Offer Declined
        Given A candidate is displayed on the candidate details page with Offer Declined status
        When The "Reject" button is clicked
        And The "Reject Candidate" form is displayed with candidate information on the Candidate Change Status Page
        And The note "Candidate declined our offer" is entered
        And The action is saved
        Then The system should be redirected to the candidate details page and the status of the candidate should be "Rejected"

