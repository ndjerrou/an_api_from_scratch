const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();

// CRUD - [GET, POST, PUT, DELETE]

// API RestFULL - /products

// [GET /products - GET /products/id]
// [POST /products]
// [PUT /products/id]
// [DELETE /products/id]

const products = [];

for (let i = 0; i < 7; i++) {
  products[i] = {
    id: faker.string.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
  };
}

console.log(products);

app.get('/products', (req, res) => {
  res.send(products);
});

// GET /products/id
app.get('/products/:id', (req, res) => {
  const { id } = req.params;

  const idx = products.findIndex(product => product.id === id);

  if (idx !== -1)
    return res.status(200).send({ ok: true, data: products[idx] });

  res.status(404).send({
    ok: false,
    msg: 'Product was not found with the given id',
  });
});

app.get('', (req, res) => {
  res.send('Welcome , homepage');
});

// app.get('*', (req, res) => {
//   res.send("je traite n'importe quelle page");
// });

app.listen(8000, () => console.log('Listenning on port 8000'));
