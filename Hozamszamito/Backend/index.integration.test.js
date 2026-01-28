jest.mock('mysql2'); // mock mysql2
const mysql = require('mysql2');
const request = require('supertest');
const app = require('./index');

const mockQuery = mysql.__mockQuery;

describe('Integrációs teszt', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/foldszam válaszol', async () => {
    mockQuery.mockImplementationOnce((sql, cb) => {
      cb(null, [{ 'COUNT(*)': 5 }]); // visszaadott db eredmény
    });

    const res = await request(app).get('/api/foldszam');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ 'COUNT(*)': 5 }]);
  });
});
