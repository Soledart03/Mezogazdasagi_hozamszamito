jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed')
}));

jest.mock('mysql2'); 
const mysql = require('mysql2');
const request = require('supertest');
const app = require('./index');
const bcrypt = require('bcrypt');

const mockQuery = mysql.__mockQuery;

describe('NUnit UNIT tesztek', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
test('DELETE /api/terv/:id működik', async () => {
    mockQuery.mockImplementationOnce((sql, params, cb) => {
      cb(null); 
    });

    const res = await request(app).delete('/api/terv/2');

    expect(mockQuery).toHaveBeenCalledWith(
      'DELETE FROM terv WHERE id=?',
      ['2'],
      expect.any(Function)
    );

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({
      message: 'Tervezet törölve!'
    });
  });

  test('GET /api/noveny működik', async () => {
    mockQuery.mockImplementationOnce((sql, cb) => {
      cb(null, [{ id: 1, nnev: 'Búza', kep: 'buza.jpg' }]);
    });

    const res = await request(app).get('/api/noveny');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ id: 1, nnev: 'Búza', kep: 'buza.jpg' }]);
  });

  test('GET /api/kiadasok_szam működik', async () => {
    mockQuery.mockImplementationOnce((sql, params, cb) => {
      cb(null, [{ fold_id: 1, kiadas_db: 2 }]);
    });

    const res = await request(app).get('/api/kiadasok_szam/1');

    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([{ fold_id: 1, kiadas_db: 2 }]);
  });
});
