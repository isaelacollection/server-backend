import mongoose from "mongoose";

const VentaSchema = new mongoose.Schema(
  {
    clienteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario", // o "Cliente" si tienes ese modelo
      required: false,
    },

    fecha: {
      type: Date,
      default: Date.now,
    },

    total: {
      type: Number,
      required: true,
      min: 0,
    },

    metodoPago: {
      type: String,
      enum: ["efectivo", "transferencia", "tarjeta", "WhatsApp"],
      required: true,
    },

    estado: {
      type: String,
      enum: ["pendiente", "pagado", "cancelado"],
      default: "pendiente",
    },
  },
  {
    timestamps: true, // createdAt y updatedAt
  }
);

export default mongoose.model("Venta", VentaSchema);
