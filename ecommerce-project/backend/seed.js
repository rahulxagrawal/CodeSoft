require('dotenv').config();
const connectDB = require('./config/db');
const Product = require('./models/Product');

const products = [
  { title: 'Blue T-Shirt', description: 'Comfortable cotton', price: 499, category: 'clothing', image: '', countInStock: 20 },
  { title: 'Wireless Headphones', description: 'Noise cancelling', price: 2499, category: 'electronics', image: '', countInStock: 10 },
  { title: 'Coffee Mug', description: 'Ceramic 350ml', price: 199, category: 'home', image: '', countInStock: 50 }
];

const seed = async () => {
  await connectDB();
  await Product.deleteMany();
  await Product.insertMany(products);
  console.log('Seeded products');
  process.exit();
};
seed();
