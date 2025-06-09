describe("Landing page", () => {
  it("should render correctly", () => {
    cy.visit("/");
    cy.get("h1").should("exist");
    cy.contains(
      "Your trusted platform to discover, review, and book clinics near you"
    );

    cy.get("nav").should("exist");
  });
});
