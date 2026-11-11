const express = require('express');
const cors = require('cors');
const tareasRoutes = require('./routes/tareas.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', tareasRoutes);

module.exports = app;
