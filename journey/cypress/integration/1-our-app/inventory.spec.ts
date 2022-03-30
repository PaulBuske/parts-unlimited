import {describe} from "mocha";

const addProduct = (product: string) => {
  cy.findByLabelText("Product to add").type(product);
  cy.findByRole("button").click();
}

function viewInventory() {
  cy.visit("http://localhost:8080");
}

function createAProduct() {
  addProduct("product1");
}

function increaseProductByOneHundred() {
  cy.findByLabelText("quantity").type("100");
  cy.findByRole("button", {name: /update/i}).click();
}

function expectToSeeOneHundred() {
  cy.findByText("100")
}

describe("inventory", () => {

  describe("when I add additional inventory to existing inventory", () =>{
    it('should display the increased amount for the product', () => {
      viewInventory();
      createAProduct();
      increaseProductByOneHundred();
      expectToSeeOneHundred();
        }
    );
  })

  describe("when adding a product offering", () => {
    it("should display the new product with a default quantity of 0", () => {
      cy.visit("http://localhost:8080");
      addProduct("shiny-new-product");
      cy.findByText("shiny-new-product").should("exist");
      cy.findByText("0").should("exist");
    });
  });
});
