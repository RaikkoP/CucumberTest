Feature: Searching for products on Kaup24

  Scenario: Searching for 'Toolid'
    Given I am on the Kaup24 homepage
    When I search for 'Toolid'
    Then I should see search results

  Scenario: Adding a product to the cart
    Given I am on the search results page for 'Toolid'
    When I click on the first product
    And I add the product to the cart
    Then the product should be in the cart

  Scenario: Finding a product using menus
    Given I am on the Kaup24 homepage
    When I navigate through the menus to find a TV
    Then I should see TV products