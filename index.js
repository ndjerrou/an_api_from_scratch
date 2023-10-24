require('dotenv').config();
const express = require('express');
const { faker } = require('@faker-js/faker');
const Joi = require('joi');

const Product = require('./product.model');
const connect = require('./connect');

connect();

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

app.post('/products', async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.string().required(),
    description: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      ok: false,
      msg: error.details[0].message,
    });
  }

  const product = new Product(req.body);

  try {
    await product.save();
    res.status(201).send({ ok: true, msg: product });
  } catch (err) {
    res.status(500).send({ ok: false, msg: 'Internal server error' });
  }
});

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
