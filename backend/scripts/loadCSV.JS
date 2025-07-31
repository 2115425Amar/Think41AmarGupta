const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Load DB config
const dbConfig = require('../config');

const results = [];

fs.createReadStream(path.join(__dirname, '../../database/products.csv'))
  .pipe(csv())
  .on('data', (data) => results.push(data))
  .on('end', async () => {
    const connection = await mysql.createConnection(dbConfig);

    for (let row of results) {
      const {
        id,
        cost,
        category,
        name,
        brand,
        retail_price,
        department,
        sku,
        distribution_center_id,
      } = row;

      await connection.execute(
        `INSERT INTO products (id, cost, category, name, brand, retail_price, department, sku, distribution_center_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          Number(id),
          Number(cost),
          category,
          name,
          brand,
          Number(retail_price),
          department,
          sku,
          Number(distribution_center_id),
        ]
      );
    }

    await connection.end();
    console.log('CSV data successfully imported into MySQL.');
  });
