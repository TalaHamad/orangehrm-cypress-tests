export default class DashboardPageAssertions {
  static checkDashboardHeaderText(
    assertion: "exist" | "not.exist" = "exist"
  ): void {
    cy.contains(".oxd-topbar-header-breadcrumb-module", "Dashboard").should(
      assertion
    );
  }
}
