//models/ProductPantalon
import mongoose from "mongoose";

const productVestidoSchema = new mongoose.Schema({
  categoriaVestido: { type: String, required: true },
  nombreVestido: { type: String, required: true },
  precioVestido: { type: Number, required: true },
  stockVestido: { type: Number, required: true },
  detalleVestido: { type: String, required: true },
  imageVestido: { type: String, required: true }
});

export default mongoose.model("ProductVestido", productVestidoSchema);
