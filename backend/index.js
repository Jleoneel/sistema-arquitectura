const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./database');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use('/api/products', productRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => res.send('API Inventario corriendo'));

sequelize.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Servidor en http://localhost:${process.env.PORT}`);
  });
}).catch((err) => {
  console.error('Error al conectar con la BD:', err);
});
