const fs = require('fs').promises;

class ProductManager {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async addProduct(product) {
    try {
      const products = await this.getProducts();
      product.id = this.generateId(products);
      products.push(product);
      await this.saveProducts(products);
      console.log("Producto agregado:", product);
    } catch (error) {
      console.error("Error al agregar producto:", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const products = await this.getProducts();
      return products.find(product => product.id === id);
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      throw error;
    }
  }

  async updateProduct(id, updatedFields) {
    try {
      let products = await this.getProducts();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...updatedFields };
        await this.saveProducts(products);
        console.log("Producto actualizado:", products[index]);
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al actualizar producto:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      let products = await this.getProducts();
      const index = products.findIndex(product => product.id === id);
      if (index !== -1) {
        const deletedProduct = products.splice(index, 1)[0];
        await this.saveProducts(products);
        console.log("Producto eliminado:", deletedProduct);
      } else {
        console.error("Producto no encontrado");
      }
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      throw error;
    }
  }

  async saveProducts(products) {
    await fs.writeFile(this.filePath, JSON.stringify(products, null, 2));
  }

  generateId(products) {
    const lastId = products.length > 0 ? products[products.length - 1].id : 0;
    return lastId + 1;
  }
}

module.exports = ProductManager;