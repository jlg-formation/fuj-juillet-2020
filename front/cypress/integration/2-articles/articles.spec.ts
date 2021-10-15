describe('first test', () => {
  const isConnectedAlias = 'isConnected';

  beforeEach(() => {
    cy.intercept('GET', '/api/auth/isConnected').as(isConnectedAlias);
    cy.visit('http://localhost:4200');
    cy.wait('@' + isConnectedAlias);
  });

  it('should add an article', () => {
    const uuid = () => Cypress._.random(0, 1e6);
    const testname = `Testname${uuid()}`;

    cy.get('header').contains('Se connecter');
    cy.get('main').contains('Voir le stock').click();
    cy.get('main').contains('Connexion avec Test Provider').click();

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
  });
});
