const request = require('supertest');
const app = require('../backend/src/main'); // Adjust path as needed

describe('Backend API Tests', () => {
  it('should get markets', async () => {
    const res = await request(app).get('/api/markets');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should place an order', async () => {
    const order = {
      symbol: 'BTC/USDT',
      side: 'buy',
      quantity: 1,
      price: 50000,
    };
    const res = await request(app).post('/api/orders').send(order);
    expect(res.status).toBe(201);
  });

  it('should process payment', async () => {
    const payment = {
      amount: 100,
      currency: 'USD',
    };
    const res = await request(app).post('/api/payments/charge').send(payment);
    expect(res.status).toBe(200);
  });
});
