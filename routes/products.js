import express from "express";
import Product from "../models/Product.js";
import { upload } from "./upload.js"; // ✅ Importamos la configuración lista


const router = express.Router();

// Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const productos = await Product.find();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener productos" });
  }
});






//Crear producto (con imagen en Cloudinary)
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { nombre, precio, stock } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Debe subir una imagen del producto" });
    }

    const nuevo = new Product({
      nombre,
      precio,
      stock,
      image: req.file.path, // URL generada por Cloudinary
    });

    await nuevo.save();
    res.status(201).json(nuevo);
  } catch (err) {
    console.error("❌ Error al crear producto:", err);
    res.status(400).json({ error: "Error al crear producto" });
  }
});





// Actualizar producto
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar producto" });
  }
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar producto" });
  }
});

export default router;
