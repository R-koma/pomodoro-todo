Cypress.Commands.add('createPost', (title = 'test') => {
  cy.request('POST', 'http://localhost:3000/posts', {
    title,
    body: 'body',
    createdAt: new Date().toISOString(),
    likes: 0,
  });
});
