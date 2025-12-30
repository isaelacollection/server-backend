import express from "express";
import Venta from "../models/Venta.js";

const router = express.Router();


// ===============================
// POST /ventas
// Crear una venta (cliente)
// ===============================
router.post("/", async (req, res) => {
  try {
    const { clienteId, total, metodoPago } = req.body;

    if (!total || !metodoPago) {
      return res.status(400).json({ message: "Datos incompletos" });
    }

    const nuevaVenta = new Venta({
      clienteId: clienteId || null,
      total,
      metodoPago,
      estado: "pendiente",
    });

    const ventaGuardada = await nuevaVenta.save();
    res.status(201).json(ventaGuardada);

  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({ message: "Error al crear la venta" });
  }
});


// ===============================
// GET /ventas
// Ver todas las ventas (admin)
// ===============================
router.get("/", async (req, res) => {
  try {
    const ventas = await Venta.find()
      .populate("clienteId", "nombre email")
      .sort({ createdAt: -1 });

    res.json(ventas);
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
});


// ===============================
// GET /ventas/:id
// Ver una venta específica
// ===============================
router.get("/:id", async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id)
      .populate("clienteId", "nombre email");

    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.json(venta);
  } catch (error) {
    console.error("Error al obtener venta:", error);
    res.status(500).json({ message: "Error al obtener la venta" });
  }
});


// ===============================
// PUT /ventas/:id/estado
// Cambiar estado de la venta
// ===============================
router.put("/:id/estado", async (req, res) => {
  try {
    const { estado } = req.body;

    if (!["pendiente", "pagado", "cancelado"].includes(estado)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const venta = await Venta.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.json(venta);
  } catch (error) {
    console.error("Error al actualizar estado:", error);
    res.status(500).json({ message: "Error al actualizar estado" });
  }
});


// ===============================
// DELETE /ventas/:id
// Cancelar / eliminar venta
// ===============================
router.delete("/:id", async (req, res) => {
  try {
    const venta = await Venta.findByIdAndDelete(req.params.id);

    if (!venta) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.json({ message: "Venta eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    res.status(500).json({ message: "Error al eliminar la venta" });
  }
});


export default router;
