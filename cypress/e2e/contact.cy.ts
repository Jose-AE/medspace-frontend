describe("Contact Page", () => {
  beforeEach(() => {
    cy.visit("/contact");
  });

  it("should display the Contact Us header", () => {
    cy.contains("h1", "Contact Us").should("be.visible");
  });

  it("should show all contact methods", () => {
    const contactTitles = ["Email Support", "Phone Support", "Office Address"];

    contactTitles.forEach((title) => {
      cy.contains(title).should("be.visible");
    });
  });

  it("should show all support categories", () => {
    const categoryTitles = [
      "Medical Professionals",
      "Clinic Owners",
      "Technical Support"
    ];

    categoryTitles.forEach((title) => {
      cy.contains(title).should("be.visible");
    });
  });

  it("should show contact emails for each category", () => {
    const emails = [
      "doctors@medspace.com",
      "clinics@medspace.com",
      "tech@medspace.com"
    ];

    emails.forEach((email) => {
      cy.contains(email).should("be.visible");
    });
  });
});
