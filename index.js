import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import productRoutes from "./routes/products.js";
import productPantalonRoutes from "./routes/productPantalon.js";
import productBlusaRoutes from "./routes/productBlusa.js";
import productFaldaRoutes from "./routes/productFalda.js";
import productVestidoRoutes from "./routes/productVestido.js";
import uploadRoutes from "./routes/upload.js";
import usuarioRoutes from "./routes/usuarios.js";
import authRoutes from "./routes/auth.js";
import ventasRoutes from "./routes/venta.js";
import detalleVentaRoutes from "./routes/detalleVenta.js";





//mongoose.connect(process.env.MONGO_URI)
const app = express();
//conexion a laos middlewere
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // También añade esto, es útil.

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas"))
  .catch((err) => console.error("❌ Error al conectar:", err));

// Rutas
app.use("/api/products", productRoutes);
app.use("/api/productPantalons", productPantalonRoutes);
app.use("/api/productBlusas", productBlusaRoutes);
app.use("/api/productFaldas", productFaldaRoutes);
app.use("/api/productVestidos", productVestidoRoutes);
app.use("/api/upload", uploadRoutes);//para cargar la imagen a cloudinary
// 👇 Esta línea debe existir
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ventas", ventasRoutes);
app.use("/api/detalleVentas", detalleVentaRoutes);



// Ruta raíz opcional para comprobar Render
app.get("/", (req, res) => {
  res.send("🚀 Backend activo en Render: server_backend funcionando correctamente");
});

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
