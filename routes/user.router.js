const express = require('express');
const { encryptPass } = require('../middlewares/authMiddleware');
const UserController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', UserController.getAllUsers);
router.post('/', encryptPass, UserController.createUser);
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario único
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico única del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             required:
 *               - username
 *               - email
 *               - password
 *             example:
 *               username: "nuevoUsuario"
 *               email: "usuario@ejemplo.com"
 *               password: "ContraseñaSegura123"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 userId:
 *                   type: string
 *                   description: ID del usuario creado
 *               example:
 *                 message: "Usuario creado exitosamente"
 *                 userId: "60af924bfc13ae3d5000000b"
 *       400:
 *         description: Datos de entrada inválidos
 *       409:
 *         description: El usuario ya existe
 */

module.exports = router;
