const { faker } = require('@faker-js/faker');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = process.env.DB_URI;

async function seedDB() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
  });

  try {
    await client.connect();
    console.log('Connected correctly to server');

    const collection = client.db('online-restaurant').collection('products');

    // The drop() command destroys all data from a collection.
    // Make sure you run it against proper database and collection.
    collection.drop();

    let products = [];

    for (let i = 0; i < 20; i++) {
      let product = {
        name: faker.commerce.productName(),
        price: faker.commerce.price(3, 20, 0),
        adjective: faker.commerce.productAdjective(),
        description: faker.commerce.productDescription(),
        ingredients: faker.commerce.productMaterial(),
      };

      products.push(product);
    }
    await collection.insertMany(products);

    console.log('Database seeded! :)');
  } catch (err) {
    console.log(err);
  } finally {
    await client.close();
  }
}

seedDB();
