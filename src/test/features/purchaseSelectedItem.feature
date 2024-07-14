Feature: User login with with valid credemtial
   
    Background: 
        Given User navigates to the application
        And User login with valid credentail as "standard_user" and "secret_sauce"
        And Validate successful login
    @E2E
    Scenario: Validate successful login
        When User select any 3 items from the swag labs page
        And User click on cart icon to go ahead with checkout of added items
        And User click on checkout button on cart page
        And User provide "soumya" , "Mohanty" and "411028"
        And User click on continue button
        And User validate price , payment and shipping info
        Then User click on finish button
        And Validate checkout complete successful message
        And click on Backhome button
        And Logout of the application