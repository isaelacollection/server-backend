import mongoose from "mongoose";

const DetalleVentaSchema = new mongoose.Schema(
  {
    ventaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Venta",
      required: true,
    },

    productoId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      // Si tienes modelos separados (Blazer, Pantalon, etc.)
      // NO se usa ref para evitar conflictos
    },

    nombreProducto: {
      type: String,
      required: true,
      trim: true,
    },

    precioUnitario: {
      type: Number,
      required: true,
      min: 0,
    },

    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("DetalleVenta", DetalleVentaSchema);
