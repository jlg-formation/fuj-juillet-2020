describe('first test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('contains Gestion Stock', () => {
    cy.get('header span').first().should('have.text', 'Gestion Stock');
  });

  it('contains header with Gestion Stock', () => {
    cy.get('header').contains('Gestion Stock');
  });

  it('contains footer with Mentions Légales', () => {
    cy.get('footer').contains('Mentions Légales').click();
    cy.url().should('include', '/legal');
  });
});
