describe('CRUD flow', () => {
  beforeEach(() => {
    // テスト前にデータをクリーンアップ
    cy.request('GET', 'http://localhost:3000/posts').then((response) => {
      response.body.forEach((post) => {
        cy.request('DELETE', `http://localhost:3000/posts/${post.id}`);
      });
    });

    cy.visit('/');
  });

  it('creates, edits and deletes a post', () => {
    /* ───── Create ───── */
    cy.intercept('POST', '**/posts').as('createPost');
    cy.contains('投稿').should('be.visible').click();

    // 投稿フォームが表示されるのを待つ
    cy.get('#title').should('be.visible');
    cy.get('#body').should('be.visible');

    cy.get('#title').type('E2E テスト');
    cy.get('#body').type('Cypress で投稿を作成');
    cy.contains('button', '投稿').click();

    // POSTリクエストの完了を待つ
    cy.wait('@createPost').its('response.statusCode').should('eq', 201);
    cy.location('pathname').should('eq', '/');
    cy.contains('E2E テスト').should('be.visible');

    /* ───── Detail ───── */
    cy.contains('E2E テスト').click();
    cy.contains('Cypress で投稿を作成').should('be.visible');

    /* ───── Edit ───── */
    cy.intercept('PUT', '**/posts/*').as('updatePost');
    cy.get('a[href$="/edit"]').should('be.visible').click();

    // 編集フォームが表示されるのを待つ
    cy.get('#body').should('be.visible').clear().type('本文を編集しました');

    cy.contains('button', '更新').click();
    cy.wait('@updatePost').its('response.statusCode').should('eq', 200);
    cy.contains('本文を編集しました').should('be.visible');

    /* ───── Delete ───── */
    cy.intercept('DELETE', '**/posts/*').as('deletePost');
    cy.get('button').contains('🗑️').should('be.visible').click();

    // 削除の確認
    cy.on('window:confirm', () => true);
    cy.wait('@deletePost').its('response.statusCode').should('eq', 200);
    cy.location('pathname').should('eq', '/');
    cy.contains('E2E テスト').should('not.exist');
  });
});
