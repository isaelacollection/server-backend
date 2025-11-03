
//const express = require('express');
import express from 'express';
//const router = express.Router();
const router = express.Router();

import Usuario from '../models/Usuario.js';
//const jwt = require('jsonwebtoken');
import jwt from 'jsonwebtoken';


// Login
router.post('/login', async (req, res) => {
  const { correo, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(400).json({ mensaje: 'Usuario no encontrado' });

    const esValida = await usuario.compararContraseña(password);
    if (!esValida) return res.status(400).json({ mensaje: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET || 'secreto123',
      { expiresIn: '1h' }
    );

    res.json({ 
      token, 
      rol: usuario.rol, 
      nombre: usuario.nombre // estoy almacenando el nombre del usuario o administrador
     });
  } catch (err) {
     console.error('❌ Error en /api/auth/login:', err);  // 👈 esto muestra el error real
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: err });
  }
});

export default router; 
