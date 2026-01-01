import express from "express";
import DetalleVenta from "../models/DetalleVenta.js";

const router = express.Router();

/**
 * POST /api/detalleVentas
 * Sistema → Guardar productos de una venta
 */
router.post("/", async (req, res) => {
  try {
    const detalle = await DetalleVenta.create({
      ventaId: req.body.ventaId,
      productoId: req.body.productoId,
      nombreProducto: req.body.nombreProducto,
      precioUnitario: req.body.precioUnitario,
      cantidad: req.body.cantidad,
      subtotal: req.body.subtotal,
    });

    res.status(201).json(detalle);
  } catch (error) {
    console.error("❌ Error detalle venta:", error);
    res.status(500).json({
      message: "Error al guardar detalle de venta",
      error,
    });
  }
});

/**
 * GET /api/detalleVentas/:ventaId
 * Admin → Ver productos de una venta
 */
router.get("/:ventaId", async (req, res) => {
  try {
    const detalles = await DetalleVenta.find({
      ventaId: req.params.ventaId,
    });

    res.json(detalles);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener detalles",
      error,
    });
  }
});

/**
 * DELETE /api/detalleVentas/:id
 * Admin → Eliminar ítem
 */
router.delete("/:id", async (req, res) => {
  try {
    const detalle = await DetalleVenta.findByIdAndDelete(req.params.id);

    if (!detalle) {
      return res.status(404).json({ message: "Ítem no encontrado" });
    }

    res.json({ message: "Ítem eliminado correctamente" });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar ítem",
      error,
    });
  }
});

export default router;
