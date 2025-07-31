const express = require('express');
const app = express();
const productRoutes = require('./routes/products');

app.use('/api/products', productRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
