require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const rfs = require('rotating-file-stream');
const swaggerUi = require('swagger-ui-express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const swaggerSpec = require('./config/swaggerconfig');
const originList = require('./middlewares/cors');
const userRouter = require('./routes/user.router');
const productRouter = require('./routes/product.router');
const orderRouter = require('./routes/order.router');
const billRotuer = require('./routes/bill.router');

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(cors(originList(PORT)));

app.use(helmet());

// Creamos una función para generar el nombre del archivo de log
const generateLogFileName = () => {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear();
  return `${day}-${month}-${year}.log`;
};

// Configuramos el stream de log con el nombre de archivo generado
const streamLog = rfs.createStream(generateLogFileName, {
  size: '10M',
  interval: '1d',
  compress: 'gzip',
  path: path.join(__dirname, 'logs'),
});

app.use(morgan('combined', { stream: streamLog }));

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/bill', billRotuer);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
