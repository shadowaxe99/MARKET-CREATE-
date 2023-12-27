```javascript
require('dotenv').config();
const mongoose = require('mongoose');
const UserModel = require('../server/models/UserModel');
const AssetModel = require('../server/models/AssetModel');
const TransactionModel = require('../server/models/TransactionModel');

const users = [
  // Add mock user data
  {
    username: 'creator1',
    email: 'creator1@example.com',
    password: 'password123',
    role: 'creator'
  },
  {
    username: 'consumer1',
    email: 'consumer1@example.com',
    password: 'password123',
    role: 'consumer'
  }
];

const assets = [
  // Add mock asset data
  {
    title: 'Digital Artwork #1',
    description: 'A unique piece of digital art',
    creator: 'creator1',
    price: 1.5,
    assetType: 'NFT',
    tags: ['art', 'digital']
  },
  {
    title: 'Indie Game Asset Pack',
    description: 'A set of assets for indie game developers',
    creator: 'creator1',
    price: 3.0,
    assetType: 'NFT',
    tags: ['game', 'assets']
  }
];

const transactions = [
  // Add mock transaction data
  {
    asset: 'Digital Artwork #1',
    buyer: 'consumer1',
    seller: 'creator1',
    price: 1.5,
    transactionDate: new Date()
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Clear the database
    await UserModel.deleteMany({});
    await AssetModel.deleteMany({});
    await TransactionModel.deleteMany({});

    // Seed Users
    for (const user of users) {
      const newUser = new UserModel(user);
      await newUser.save();
    }

    // Seed Assets
    for (const asset of assets) {
      const newAsset = new AssetModel(asset);
      await newAsset.save();
    }

    // Seed Transactions
    for (const transaction of transactions) {
      const newTransaction = new TransactionModel(transaction);
      await newTransaction.save();
    }

    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();
```