describe("Signup Form", () => {
  beforeEach(() => {
    cy.visit("/auth/register");
  });

  it("should render the form correctly", () => {
    cy.contains("label", "Full Name:").should("exist");
    cy.contains("label", "Email:").should("exist");
    cy.contains("label", "Password:").should("exist");
    cy.contains("label", "Phone Number:").should("exist");
    cy.contains("label", "User Type:").should("exist");
    cy.get("button").contains("Next");
  });

  it("should navigate to second step after clicking Next", () => {
    cy.get("input").eq(0).type("Test User");
    cy.get("input").eq(1).type("test@example.com");
    cy.get('input[type="password"]').type("password123");
    cy.get('input[type="number"]').type("1234567890");
    cy.get("select").select("Tenant");

    cy.get("button").contains("Next").click();

    // Second step elements
    cy.get("form").within(() => {
      cy.get("label").contains("Upload Profile Picture").should("exist");
      cy.get("label").contains("Upload Official ID Card").should("exist");
      cy.get("label").contains("Short description about you:").should("exist");

      // Verify tenant specific fields
      cy.get("label").contains("Specialty:").should("exist");
      cy.get("label").contains("Professional License Number:").should("exist");
      cy.get("label").contains("Upload Professional License").should("exist");
    });

    // Avatar should be visible
    cy.get("div").find("img, svg").should("exist");
  });
});
