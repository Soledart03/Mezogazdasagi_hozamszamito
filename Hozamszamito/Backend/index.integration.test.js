const request = require('supertest');
const app = require('./index'); 

jest.mock('./db', () => ({
  query: jest.fn(),
}));

const db = require('./db');

describe('POST /api/pfold integrációs teszt (mockolt db)', () => {

  test('kérés → feldolgozás → válasz', async () => {
    const payload = {
      terulet: 12.5,
      muvelesi_ag: 'Szántó',
      helyrajzi_szam: 'TESZT-123',
      elozo_evi_hasznositas: 'Búza',
      gazda_id: 1
    };

    db.query.mockImplementationOnce((sql, params, cb) => {
      cb(null, { insertId: 42 }); 
    });

    const res = await request(app)
      .post('/api/pfold')
      .send(payload)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.id).toBe(42);
  });

  test('DELETE /api/terv/:id működik', async () => {
    db.query.mockImplementationOnce((sql, params, cb) => {
      cb(null); 
    });

    const res = await request(app)
      .delete('/api/terv/2')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(res.body.message).toBe('Tervezet törölve!');
  });

});
