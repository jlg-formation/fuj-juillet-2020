describe('first test', () => {
  it('should add an article', () => {
    cy.intercept('GET', '/api/auth/isConnected').as('isConnected');
    cy.visit('http://localhost:4200');
    cy.wait('@isConnected');
    cy.get('@isConnected').its('response.statusCode').should('eq', 401);

    const uuid = () => Cypress._.random(0, 1e6);
    const testname = `Testname${uuid()}`;

    cy.get('header').contains('Se connecter');
    cy.get('main').contains('Voir le stock').click();
    cy.contains('Connexion avec Test Provider', { timeout: 10000 })
      .should('be.visible')
      .click();

    cy.wait('@isConnected');
    cy.get('@isConnected.2')
      .its('response.statusCode')
      .should('be.oneOf', [200, 304]);

    cy.log('should show the stocks');
    cy.get('main').contains('Ajouter').click();
    cy.get('main').get('input[formcontrolname=name]').clear().type(testname);
    cy.get('main').get('input[formcontrolname=price]').clear().type('1.45');
    cy.get('main').get('input[formcontrolname=qty]').clear().type('345');

    const getArticleAlias = 'getArticles';
    cy.intercept('GET', '/api/articles').as(getArticleAlias);
    cy.get('main').get('button').contains('Ajouter').click();
    cy.wait('@' + getArticleAlias);

    cy.get('main').contains(testname).click();
    cy.get('main').contains('Supprimer').click();
  });
});
