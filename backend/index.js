require('dotenv').config();

const connectToMongo = require('./db');
const cors = require('cors');
const express = require('express');

const app = express();
const port = 5000;

connectToMongo();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));

app.listen(port, () => {
  console.log(`Server Running On Port ${port}`);
});