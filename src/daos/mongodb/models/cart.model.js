import mongoose from "mongoose";

export const cartsCollectionName = "cart";

const cartSchema = new mongoose.Schema({
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', required: true},
      quantity: {type: Number,required: true,default: 1}
    }
  ],
});

export const CartModel = mongoose.model(cartsCollectionName, cartSchema);
