//models/ProductPantalon
import mongoose from "mongoose";

const productPantalonSchema = new mongoose.Schema({
  categoriaPantalon: { type: String, required: true },
  nombrePantalon: { type: String, required: true },
  precioPantalon: { type: Number, required: true },
  stockPantalon: { type: Number, required: true },
  detallePantalon: { type: String, required: true },
  imagePantalon: { type: String, required: true }
});

export default mongoose.model("ProductPantalon", productPantalonSchema);
