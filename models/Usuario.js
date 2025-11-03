
//const mongoose = require('mongoose');
import mongoose from 'mongoose';
//const bcrypt = require('bcryptjs');
import bcrypt from 'bcryptjs';


const UsuarioSchema = new mongoose.Schema({
  nombre: String,
  correo: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ['admin', 'usuario'], default: 'usuario' }
});

// Middleware pre-save para hashear la contraseña (Funciona bien)
UsuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


// Método de Mongoose para comparar la contraseña (Login)
// 💡 CORRECCIÓN: La función debe ser 'async' para poder usar 'await' correctamen
UsuarioSchema.methods.compararContraseña = function (contraseñaIngresada) {
  return bcrypt.compare(contraseñaIngresada, this.password);
};

const Usuario = mongoose.model('Usuario', UsuarioSchema);

// Exportar como default para ser usado con 'import Usuario from ...'
export default Usuario;