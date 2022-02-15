import { restore, popover, POPOVER_ELEMENT } from "__support__/e2e/cypress";

describe("11914, 18978, 18977", () => {
  beforeEach(() => {
    restore();
    cy.signInAsAdmin();
    cy.intercept("/api/card/*/query").as("cardQuery");
  });

  it("should not display query editing controls and 'Browse Data' link", () => {
    cy.createQuestion({
      query: {
        "source-table": "card__1",
      },
    }).then(({ body: { id } }) => {
      cy.signIn("nodata");
      cy.visit(`/question/${id}`);
      cy.wait("@cardQuery");

      cy.get(".Nav").within(() => {
        cy.findByText(/Browse data/i).should("not.exist");
        cy.icon("add").click();
      });

      popover().within(() => {
        cy.findByText("Question").should("not.exist");
        cy.findByText(/query/).should("not.exist");
      });

      cy.findByTestId("qb-header-action-panel").within(() => {
        cy.icon("notebook").should("not.exist");
        cy.findByText("Filter").should("not.exist");
        cy.findByText("Summarize").should("not.exist");
      });
      cy.findByTestId("viz-type-button").should("not.exist");
      cy.findByTestId("viz-settings-button").should("not.exist");

      // Ensure no drills offered when clicking a column header
      cy.findByText("Subtotal").click();
      assertNoOpenPopover();

      // Ensure no drills offered when clicking a regular cell
      cy.findByText("6.42").click();
      assertNoOpenPopover();

      // Ensure no drills offered when clicking FK
      cy.findByText("184").click();
      assertNoOpenPopover();
      cy.url().should("include", `/question/${id}`);
    });
  });
});

function assertNoOpenPopover() {
  cy.get(POPOVER_ELEMENT).should("not.exist");
}
