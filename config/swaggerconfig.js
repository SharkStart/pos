const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API REST for POS',
      version: '1.0.0',
      description: 'Endpoints iniciales para pruebas',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/**.js', 'controllers/**.js', 'models/**.js'],

};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
