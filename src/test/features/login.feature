Feature: User login with with valid credemtial

    Background: 
        Given User navigates to the application
    @smoke
    Scenario: Validate successful login
        And User enter the username as "standard_user"
        And User enter the password as "secret_sauce"
        When User click on the login button
        Then Validate successful login
  
    Scenario: Validate unsuccessful login
        And User enter the username as "Soumya"
        And User enter the password as "323"
        When User click on the login button
        Then Validate unsuccessful login
