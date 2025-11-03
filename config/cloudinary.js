
// Cargar las variables de entorno del archivo .env
import dotenv from "dotenv";
dotenv.config(); // carga las variables del .env
import { v2 as cloudinary } from "cloudinary";



// Cloudinary detecta automáticamente CLOUDINARY_URL
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true, // opcional, fuerza URLs HTTPS
});
// Opcional: Para verificar que la URL se está cargando
console.log("CLOUDINARY URL CARGADA:", process.env.CLOUDINARY_CLOUD_NAME ? "Sí" : "No");
console.log("CLOUDINARY URL CARGADA:", process.env.CLOUDINARY_API_KEY ? "Sí" : "No");
console.log("CLOUDINARY URL CARGADA:", process.env.CLOUDINARY_API_SECRET ? "Sí" : "No");


export default cloudinary;
