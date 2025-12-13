//routes/productBlusa
import express from "express";
import ProductFalda from "../models/ProductFalda.js";
import { upload } from "./upload.js"; // ✅ Importamos la configuración lista


const router = express.Router();

// Obtener todos los productos
// @route   GET /api/products
// @desc    Obtener todos los productos
// @access  Public (Asumiendo que no requiere autenticación para leer)
router.get('/', async (req, res) => {
    try {
        // Intenta obtener todos los productos.
        const products = await ProductFalda.find(); 
        
        // Si todo va bien, devuelve la lista
        res.status(200).json(products);
        
    } catch (error) {
        // ✅ CORRECCIÓN CLAVE: Registra el error interno para saber qué pasó
        // Esto es CRÍTICO para la depuración en tu consola de backend (render.com o local)
        console.error("❌ Error al obtener productos en /api/productFalda:", error.message, error);
        
        // ✅ MEJORA: Devuelve un mensaje de error 500 (Error interno del servidor)
        // e incluye los detalles del error para la depuración del cliente (si es necesario)
        res.status(500).json({ 
            error: "Error al obtener productos", 
            details: error.message // Muestra el mensaje de error de Mongoose/MongoDB
        });
    }
})


//Crear producto (con imagen en Cloudinary)
router.post("/", upload.single("imagen"), async (req, res) => {
  try {
    const { nombreFalda, precioFalda, stockFalda } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "Debe subir una imagen del producto" });
    }

    const nuevo = new ProductBlusa({
      nombreFalda,
      precioFalda,
      stockFalda,
      imageFalda: req.file.path, // URL generada por Cloudinary
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
    const actualizado = await ProductFalda.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(actualizado);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar producto" });
  }
});

// Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    await ProductFalda.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar producto" });
  }
});

export default router;
