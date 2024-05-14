const fs = require('fs').promises;

class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async createCart(cart) {
    try {
      const carts = await this.getCarts();
      cart.id = this.generateId(carts);
      carts.push(cart);
      await this.saveCarts(carts);
      console.log("Carrito creado:", cart);
    } catch (error) {
      console.error("Error al crear carrito:", error);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      const carts = await this.getCarts();
      return carts.find(cart => cart.id === id);
    } catch (error) {
      console.error("Error al obtener carrito por ID:", error);
      throw error;
    }
  }

  async addProductToCart(cartId, productId, quantity) {
    try {
      let carts = await this.getCarts();
      const cartIndex = carts.findIndex(cart => cart.id === cartId);
      if (cartIndex !== -1) {
        const product = { id: productId, quantity };
        const existingProductIndex = carts[cartIndex].products.findIndex(item => item.id === productId);
        if (existingProductIndex !== -1) {
          carts[cartIndex].products[existingProductIndex].quantity += quantity;
        } else {
          carts[cartIndex].products.push(product);
        }
        await this.saveCarts(carts);
        console.log("Producto agregado al carrito:", product);
      } else {
        console.error("Carrito no encontrado");
      }
    } catch (error) {
      console.error("Error al agregar producto al carrito:", error);
      throw error;
    }
  }

  async getCarts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al obtener carritos:", error);
      throw error;
    }
  }

  async saveCarts(carts) {
    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
  }

  generateId(carts) {
    const lastId = carts.length > 0 ? carts[carts.length - 1].id : 0;
    return lastId + 1;
  }
}

module.exports = CartManager;
