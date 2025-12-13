import mongoose from "mongoose";

const productFaldaSchema = new mongoose.Schema({
  nombreFalda: { type: String, required: true },
  precioFalda: { type: Number, required: true },
  stockFalda: { type: Number, required: true },
  imageFalda: { type: String, required: true }
});

export default mongoose.model("ProductFalda", productFaldaSchema);
