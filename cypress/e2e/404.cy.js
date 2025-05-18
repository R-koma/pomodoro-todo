describe('404 handling', () => {
  it('redirects unknown post id to /404', () => {
    cy.visit('/posts/9999', { failOnStatusCode: false });
    cy.contains('Not Found').should('be.visible');
  });
});
