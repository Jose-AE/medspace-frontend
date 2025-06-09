describe("About Page", () => {
  beforeEach(() => {
    cy.visit("/about");
  });

  it("Should render the hero section with title and description", () => {
    cy.contains("About MedSpace").should("exist");
    cy.contains("We're revolutionizing healthcare accessibility").should(
      "exist"
    );
    cy.get('img[alt="About MedSpace"]').should("be.visible");
  });

  it("Should display mission and vision cards", () => {
    cy.contains("Our Mission").should("exist");
    cy.contains("Our Vision").should("exist");
    cy.contains(
      "To democratize access to quality healthcare infrastructure"
    ).should("exist");
    cy.contains(
      "To become Mexico's leading healthcare infrastructure platform"
    ).should("exist");
  });

  it("Should display key features", () => {
    cy.contains("Why Choose MedSpace?").should("exist");
    cy.contains("Premium Clinics").should("exist");
    cy.contains("Prime Locations").should("exist");
    cy.contains("Flexible Booking").should("exist");
    cy.contains("Secure Transactions").should("exist");
    cy.contains("Trusted Network").should("exist");
    cy.contains("Quality Assurance").should("exist");
  });

  it("Should display statistics", () => {
    cy.contains("Trusted by Healthcare Professionals").should("exist");
    cy.contains("Clinics Available").should("exist");
    cy.contains("Cities Covered").should("exist");
    cy.contains("Doctors Registered").should("exist");
  });

  it("Should display values", () => {
    cy.contains("Our Values").should("exist");
    cy.contains("Healthcare First").should("exist");
    cy.contains("Trust & Transparency").should("exist");
    cy.contains("Security & Safety").should("exist");
    cy.contains("Innovation").should("exist");
  });

  it("Should have a CTA section with working links", () => {
    cy.contains("Ready to Transform Your Practice?").should("exist");
    cy.contains("Get Started Today")
      .should("have.attr", "href")
      .and("include", "/auth/register");
    cy.contains("Learn More").should("have.attr", "href").and("include", "/");
  });
});
