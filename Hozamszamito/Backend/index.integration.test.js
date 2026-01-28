const request = require('supertest');
const app = require('./index');

describe('POST /api/pfold integrációs teszt', () => {

  test('kérés → feldolgozás → válasz', async () => {
    const payload = {
      terulet: 12.5,
      muvelesi_ag: 'Szántó',
      helyrajzi_szam: 'TESZT-123',
      elozo_evi_hasznositas: 'Búza',
      gazda_id: 1
    };

    const res = await request(app)
      .post('/api/pfold')
      .send(payload)
      .expect(200);

    expect(res.body).toHaveProperty('id');
    expect(res.body.terulet).toBe(payload.terulet);
    expect(res.body.muvelesi_ag).toBe(payload.muvelesi_ag);
    expect(res.body.helyrajzi_szam).toBe(payload.helyrajzi_szam);
    expect(res.body.elozo_evi_hasznositas).toBe(payload.elozo_evi_hasznositas);
    expect(res.body.gazda_id).toBe(payload.gazda_id);
  });

});
