import mongoose from "mongoose";

export const productsCollectionName = "product";

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  thumbnail: { type: String, required: false },
  code: { type: String, required: false },   
  category: { type: String, required: false }   
});

export const ProductModel = mongoose.model(productsCollectionName, productsSchema);
