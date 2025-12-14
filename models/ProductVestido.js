//models/ProductPantalon
import mongoose from "mongoose";

const productVestidoSchema = new mongoose.Schema({
  nombreVestido: { type: String, required: true },
  precioVestido: { type: Number, required: true },
  stockVestido: { type: Number, required: true },
  imageVestido: { type: String, required: true }
});

export default mongoose.model("ProductVestido", productVestidoSchema);
