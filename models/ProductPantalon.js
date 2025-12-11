//models/ProductPantalon
import mongoose from "mongoose";

const productPantalonSchema = new mongoose.Schema({
  nombrePantalon: { type: String, required: true },
  precioPantalon: { type: Number, required: true },
  stockPantalon: { type: Number, required: true },
  imagePantalon: { type: String, required: true }
});

export default mongoose.model("ProductPantalon", productPantalonSchema);
