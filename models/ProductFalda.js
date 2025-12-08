import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  stock: { type: Number, required: true },
  image: { type: String, required: true }
});

export default mongoose.model("Product", productSchema);
