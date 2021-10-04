describe("first test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:4200");
  });

  it("displays two todo items by default", () => {
    cy.get("header span").first().should("have.text", "Gestion Stock");
  });
});
