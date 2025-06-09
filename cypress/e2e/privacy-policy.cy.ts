describe("Privacy Policy Page", () => {
  beforeEach(() => {
    // Start from the home page
    cy.visit("/");
  });

  it("should navigate to privacy policy page and verify all sections", () => {
    // Click on the privacy policy link in the navbar
    cy.get("nav").contains("Privacy Policy").click();

    // Verify the page title and header
    cy.get("h1").should("contain", "Privacy Policy");
    cy.get("p").should(
      "contain",
      "Your privacy is important to us at MedSpace"
    );

    // Verify the table of contents
    cy.get("h2").contains("Table of Contents").should("be.visible");

    // Verify all sections in the table of contents
    const expectedSections = [
      "Information We Collect",
      "How We Use Your Information",
      "Information Sharing and Disclosure",
      "Data Security",
      "Data Retention",
      "Your Privacy Rights",
      "Cookies and Tracking",
      "Third-Party Services",
      "International Data Transfers",
      "Children's Privacy",
      "Changes to This Policy"
    ];

    expectedSections.forEach((section) => {
      cy.get("a").contains(section).should("be.visible");
    });

    // Verify each section's content
    cy.get("#information-collection").should("be.visible");
    cy.get("#information-use").should("be.visible");
    cy.get("#information-sharing").should("be.visible");
    cy.get("#data-security").should("be.visible");
    cy.get("#data-retention").should("be.visible");
    cy.get("#your-rights").should("be.visible");
    cy.get("#cookies").should("be.visible");
    cy.get("#third-party").should("be.visible");
    cy.get("#international-transfers").should("be.visible");
    cy.get("#children-privacy").should("be.visible");
    cy.get("#policy-changes").should("be.visible");

    // Verify the back to home button
    cy.get("a").contains("Back to Home").should("be.visible");
    cy.get("a").contains("Back to Home").click();

    // Verify we're back on the home page
    cy.url().should("eq", Cypress.config().baseUrl + "/");
  });

  it("should verify all section content is properly displayed", () => {
    cy.visit("/privacy-policy");

    // Test the Information Collection section
    cy.get("#information-collection").within(() => {
      cy.get("h3").should("contain", "Personal Information");
      cy.get("h3").should("contain", "Profile Information");
      cy.get("h3").should("contain", "Usage Information");
      cy.get("h3").should("contain", "Device Information");
    });

    // Test the Data Security section
    cy.get("#data-security").within(() => {
      cy.get("h3").should("contain", "Security Measures");
      cy.get("h3").should("contain", "Access Controls");
      cy.get("h3").should("contain", "Data Protection");
    });

    // Test the Your Rights section
    cy.get("#your-rights").within(() => {
      cy.get("h3").should("contain", "Access and Correction");
      cy.get("h3").should("contain", "Data Portability");
      cy.get("h3").should("contain", "Deletion Rights");
      cy.get("h3").should("contain", "Opt-Out Rights");
    });
  });

  it("should verify all icons are displayed", () => {
    cy.visit("/privacy-policy");

    // Verify the main header icon
    cy.get(".bg-primary-100").first().find("svg").should("be.visible");

    // Verify section icons
    cy.get(".bg-primary-100").should("have.length.at.least", 11); // One for each section
  });

  it("should verify responsive design", () => {
    cy.visit("/privacy-policy");

    // Verify the layout and typography
    cy.get(".max-w-4xl").should("be.visible");
    cy.get("h1").should("be.visible");
    cy.get(".bg-primary-100").should("be.visible");
    cy.get(".space-y-12").should("be.visible");
  });

  it("should verify last updated date is displayed", () => {
    cy.visit("/privacy-policy");
    cy.get("p").contains("Last updated:").should("be.visible");
  });

  it("should verify table of contents links are working", () => {
    cy.visit("/privacy-policy");

    // Test a few section links
    cy.get('a[href="#information-collection"]').click();
    cy.get("#information-collection").should("be.visible");

    cy.get('a[href="#data-security"]').click();
    cy.get("#data-security").should("be.visible");

    cy.get('a[href="#your-rights"]').click();
    cy.get("#your-rights").should("be.visible");
  });

  it("should verify introduction section is displayed", () => {
    cy.visit("/privacy-policy");

    // Verify the blue introduction box
    cy.get(".bg-blue-50").should("be.visible");
    cy.get(".bg-blue-50").should(
      "contain",
      "At MedSpace, we are committed to protecting your privacy"
    );
  });
});
