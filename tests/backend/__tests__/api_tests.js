const request = require('supertest');
const app = require('../../server/index.js');
const { UserModel, AssetModel, TransactionModel } = require('../../server/models');

describe('Elysium Marketplace API Endpoints', () => {
  let user;
  let asset;
  let transaction;

  beforeAll(async () => {
    // Mock user, asset, and transaction data
    user = await UserModel.create({ username: 'testUser', email: 'test@example.com' });
    asset = await AssetModel.create({ name: 'Test Asset', creator: user._id });
    transaction = await TransactionModel.create({ asset: asset._id, buyer: user._id });
  });

  afterAll(async () => {
    // Clean up test data
    await UserModel.deleteMany({});
    await AssetModel.deleteMany({});
    await TransactionModel.deleteMany({});
  });

  // Test user registration endpoint
  test('POST /api/users/register', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({ username: 'newUser', email: 'newuser@example.com', password: 'password123' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'UserRegistered');
  });

  // Test user login endpoint
  test('POST /api/users/login', async () => {
    const response = await request(app)
      .post('/api/users/login')
      .send({ email: 'test@example.com', password: 'password123' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'LoginSuccessful');
  });

  // Test asset creation endpoint
  test('POST /api/assets', async () => {
    const response = await request(app)
      .post('/api/assets')
      .send({ name: 'New Asset', description: 'A new asset for testing', creator: user._id });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'AssetCreated');
  });

  // Test transaction execution endpoint
  test('POST /api/transactions', async () => {
    const response = await request(app)
      .post('/api/transactions')
      .send({ asset: asset._id, buyer: user._id });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'TransactionCompleted');
  });

  // Test fetching user assets endpoint
  test('GET /api/assets/user/:userId', async () => {
    const response = await request(app).get(`/api/assets/user/${user._id}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Test fetching asset details endpoint
  test('GET /api/assets/:assetId', async () => {
    const response = await request(app).get(`/api/assets/${asset._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('_id', asset._id.toString());
  });

  // Test updating asset information endpoint
  test('PUT /api/assets/:assetId', async () => {
    const response = await request(app)
      .put(`/api/assets/${asset._id}`)
      .send({ name: 'Updated Asset Name' });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('name', 'Updated Asset Name');
  });

  // Test deleting an asset endpoint
  test('DELETE /api/assets/:assetId', async () => {
    const response = await request(app).delete(`/api/assets/${asset._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('message', 'AssetDeleted');
  });
});