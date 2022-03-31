const addProduct = (product: string) => {
  cy.findByLabelText("Product to add").type(product);
  cy.findByRole("button").click();
}

function visitTheInventoryPage() {
  cy.visit("http://localhost:8080");
}

function checkTheInventoryLevel(number: number) {
  cy.findByText(number).should("exist");
}


function addToTheInventoryLevel(product: string, number: number) {
  visitTheInventoryPage();
  cy.findByRole("button", {name: /update/i}).click();
  cy.findByRole("textbox", {name: /inventory/i}).type(number.toString());
  checkTheInventoryLevel(product, number);
}

describe("inventory", () => {
  describe("when adding a product offering", () => {
    it("should display the new product with a default quantity of 0", () => {
      cy.visit("http://localhost:8080");
      addProduct("shiny-new-product");
      cy.findByText("shiny-new-product").should("exist");
      cy.findByText("0").should("exist");
    });
  });

  describe("when adding adjusting current inventory levels", () => {
    it("should add to the inventory level", () => {
      visitTheInventoryPage();
      addProduct("Product 1");
      checkTheInventoryLevel("Product 1", 0);
      addToTheInventoryLevel("Product 1", 100);
      checkTheInventoryLevel("Product 1", 100);
    })
  });
});
