Feature: Error Validation
  @errorvalidation
  Scenario Outline: Place order
    Given a login to the ecommerce2 site with username "<username>" and password "<password>"
    Then verify error message is displayed
    Examples:
      | username    | password  |
      | rahulshetty | Abcde123@ |
      |AnmitaDash   | 123456    |