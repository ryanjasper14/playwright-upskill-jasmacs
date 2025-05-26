class CartPage {
    constructor(page) {
      this.page = page;
      this.cartItems = '.cart_item';
      this.continueShoppingBtn = '#continue-shopping';
      this.checkoutBtn = '#checkout';
      this.firstNameInput = '#first-name';
      this.lastNameInput = '#last-name';
      this.zipCodeInput = '#postal-code';
      this.continueCheckoutBtn = '#continue'; // Assuming this is the button to continue after filling in checkout info
    }
  
    getItemCount() {
      return this.page.locator(this.cartItems);
    }
    async continueShopping() {
      await this.page.click(this.continueShoppingBtn);
    }
    async goToCheckout() {
      await this.page.click(this.checkoutBtn);
    }
    async fillFirstName(firstName) {
      await this.page.fill(this.firstNameInput, firstName);
    }
    async fillLastName(lastName) {
      await this.page.fill(this.lastNameInput, lastName);
    }
    async fillZipCode(zipCode) {
      await this.page.fill(this.zipCodeInput, zipCode);
    }
    async clickContinueCheckout() {
      await this.page.click(this.continueCheckoutBtn);
    }
  }
  
  module.exports = { CartPage };
  