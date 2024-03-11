const express = require('express');
const { encryptPass } = require('../middlewares/authMiddleware');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getAllUsers);
/**
 * @swagger
 * /user:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Users]
 *     description: Obtiene el listado de todos los usuarios en formato Json
 *     responses:
 *      200:
 *        content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 * */

router.post('/', encryptPass, userController.createUser);
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
 *               rol:
 *                 type: string
 *                 description: Rol del usuario
 *             required:
 *               - username
 *               - email
 *               - password
 *             example:
 *               username: "nuevoUsuario"
 *               email: "usuario@ejemplo.com"
 *               password: "ContraseñaSegura123"
 *               rol: "admin"
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

router.post('/login', userController.loginUser);
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Inicia sesion de un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Dirección de correo electrónico del usuario
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario
 *             required:
 *               - email
 *               - password
 *             example:
 *               email: "usuario@ejemplo.com"
 *               password: "ContraseñaSegura123"
 *     responses:
 *       200:
 *         description: Usuario Logueado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de éxito
 *                 token:
 *                   type: string
 *                   description: Token JWT
 *               example:
 *                 message: "Autorizacion del usuario exitosa"
 *                 token: "60af924bfc13ae3d5000000b"
 *       400:
 *         description: Datos de entrada inválidos
 */
router.put('/:id', encryptPass, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
