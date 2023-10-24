const express = require('express');
const { faker } = require('@faker-js/faker');
const Joi = require('joi');

const app = express();

app.use(express.json());

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

// PUT /products/id ???

app.put('/products/:id', (req, res) => {
  const schema = Joi.object({
    name: Joi.string(),
    price: Joi.string(),
    description: Joi.string(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      ok: false,
      msg: error.details[0].message,
    });
  }

  const { id } = req.params;

  let product = products.find(product => product.id === id);

  console.log(req.body);

  if (!product)
    return res.status(404).send({
      ok: false,
      msg: 'Product was not found with the given id',
    });

  //   product = {
  //     ...product,
  //     ...req.body,
  //   };

  for (let key in req.body) {
    product[key] = req.body[key];
  }

  res.status(200).send({ ok: true, data: product });
});

app.listen(8000, () => console.log('Listenning on port 8000'));
