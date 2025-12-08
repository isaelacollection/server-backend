import mongoose from "mongoose";

const productBlusasSchema = new mongoose.Schema({
  nombreblusas: { type: String, required: true },
  precioblusas: { type: Number, required: true },
  stockblusas: { type: Number, required: true },
  imageblusas: { type: String, required: true }
});

export default mongoose.model("ProductBlusas", productBlusasSchema);
