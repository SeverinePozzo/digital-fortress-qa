describe('My First Automation Test', () => {
  
  it('Successfully loads the target sandbox environment', () => {
    // Tell the runner to navigate to the practice web page
    cy.visit('https://example.cypress.io');
    
    // Assert that the page contains the expected welcoming text
    cy.contains('Kitchen Sink');
  });

});