Feature: Ecommerce Validation
  @regression
  Scenario: Place order
    Given a login to the ecommerce site with username "abc109@gmail.com" and password "Abcde123@"
    When I add "ZARA COAT 3" to the cart
    Then Verify "ZARA COAT 4" is displayed in the cart
    When enter valid details and place the order
    Then Verify the order is presented in the orderHistory

  @errorvalidation
  Scenario Outline: Place order
    Given a login to the ecommerce2 site with username "<username>" and password "<password>"
    Then verify error message is displayed
    Examples:
      | username    | password  |
      | rahulshetty | Abcde123@ |
      |AnmitaDash   | 123456    | 
      |AnmitaDash123| 123456    | 