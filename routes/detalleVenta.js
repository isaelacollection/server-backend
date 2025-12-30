import express from "express";
import DetalleVenta from "../models/DetalleVenta.js";

const router = express.Router();

/**
 * POST /detalle-venta
 * Sistema → Guardar productos de una venta
 */
router.post("/detalle-venta", async (req, res) => {
  try {
    const detalle = new DetalleVenta({
      ventaId: req.body.ventaId,
      producto: req.body.producto,
      cantidad: req.body.cantidad,
      precio: req.body.precio
    });

    await detalle.save();
    res.status(201).json(detalle);
  } catch (error) {
    res.status(500).json({ message: "Error al guardar detalle de venta", error });
  }
});

/**
 * GET /detalle-venta/:ventaId
 * Admin → Ver productos de una venta
 */
router.get("/detalle-venta/:ventaId", async (req, res) => {
  try {
    const detalles = await DetalleVenta.find({
      ventaId: req.params.ventaId
    });

    res.json(detalles);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener detalles", error });
  }
});

/**
 * DELETE /detalle-venta/:id
 * Admin → Eliminar ítem
 */
router.delete("/detalle-venta/:id", async (req, res) => {
  try {
    const detalle = await DetalleVenta.findByIdAndDelete(req.params.id);
    if (!detalle) return res.status(404).json({ message: "Ítem no encontrado" });

    res.json({ message: "Ítem eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar ítem", error });
  }
});

export default router;
