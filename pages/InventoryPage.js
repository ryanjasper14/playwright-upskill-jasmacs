class InventoryPage {
    constructor(page) {
      this.page = page;
      this.backpackAddBtn = '#add-to-cart-sauce-labs-backpack';
      this.bikeLightAddBtn = '#add-to-cart-sauce-labs-bike-light';
      this.cartLink = '.shopping_cart_link';
      this.removeBackPackBtn = '#remove-sauce-labs-backpack';
      this.removeBikeLightBtn = '#remove-sauce-labs-bike-light';
      this.itemName = '.inventory_item_name';
      this.itemPrice = '.inventory_item_price';
      this.itemDescription = '.inventory_item_desc';

    }
  
    async addBackpackToCart() {
      await this.page.click(this.backpackAddBtn);
    }
  
    async addBikeLightToCart() {
      await this.page.click(this.bikeLightAddBtn);
    }
  
    async goToCart() {
      await this.page.click(this.cartLink);
    }
    async removeBackpackFromCart() {
      await this.page.click(this.removeBackPackBtn);
    }
    async removeBikeLightFromCart() {
      await this.page.click(this.removeBikeLightBtn);
    }   
    async getItemName() {
      return await this.page.locator(this.itemName).innerText();
    }
    async getItemPrice() {
      return await this.page.locator(this.itemPrice).innerText();
    }
    async getItemDescription() {
      return await this.page.locator(this.itemDescription).innerText();
    }
  }
  
  module.exports = { InventoryPage };
  