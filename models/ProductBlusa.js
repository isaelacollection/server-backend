import mongoose from "mongoose";

const productBlusaSchema = new mongoose.Schema({
  categoriaBlusa: { type: String, required: true },
  nombreBlusa: { type: String, required: true },
  precioBlusa: { type: Number, required: true },
  stockBlusa: { type: Number, required: true },
  detalleBlusa: { type: String, required: true },
  imageBlusa: { type: String, required: true }
});

export default mongoose.model("ProductBlusa", productBlusaSchema);
