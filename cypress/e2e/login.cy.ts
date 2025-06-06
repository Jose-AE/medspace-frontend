describe("Login Page", () => {
  beforeEach(() => {
    cy.visit("/auth/login");
  });

  it("should render correctly", () => {
    cy.get('input[type="text"]');
    cy.get('input[type="password"]');
    cy.get("button").contains("Login");
  });

  it("should navigate to register page", () => {
    cy.contains("Create one").click();
    cy.url().should("include", "/auth/register");
  });
});
