import { CartModel } from "./models/cart.model.js";

export default class CartDaoMongoDB {
  async getAll() {
    try {
      const response = await CartModel.find({}).populate('products.productId');
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      const response = await CartModel.findById(id).populate('products.productId');
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      const response = await CartModel.findByIdAndUpdate(id, obj, {
        new: true,
      }).populate('products.productId');
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id).populate('products.productId');
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProduct(cartId, productId, quantity) {
    try {
      const cart = await CartModel.findById(cartId);
      const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ productId, quantity });
      }
      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }
}
