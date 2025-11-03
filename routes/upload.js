import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const router = express.Router();

// Configurar almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "productos", // carpeta donde se guardarán las imágenes
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage, 
 limits: { fileSize: 10 * 1024 * 1024 } // Asegura 10MB (o más si lo necesitas)
 });

// Ruta para subir imágenes
router.post("/", upload.single("imagen"), async (req, res) => {
  try {

    // 🚨 CRÍTICO: Si no hay archivo, falla aquí (Manejo de errores del backend)
    if (!req.file) {
      return res.status(400).json({ error: "No se encontró ningún archivo de imagen para subir." });
    }
    // req.file.path contiene la URL segura cloudinary(gracias a CloudinaryStorage)
    res.json({
      imageUrl: req.file.path,
      publicId: req.file.filename,

    });


  } catch (error) {
    console.error(error);
    // 🚨 Añadir manejo de error para fallos de Cloudinary
    res.status(500).json({ message: "Error al subir la imagen" });
  }
});
export { upload }; // 🔹 exportamos upload para usarlo en otros archivos
export default router;

