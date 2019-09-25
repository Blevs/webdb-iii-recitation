const server = require('../server.js');
const request = require('supertest');
// const db = require('../data/db.js');
const prepTestDB = require('../helpers/prepTestDB.js');

beforeEach(prepTestDB);

describe('owners', () => {
  it('post /', async () => {
    const res = await request(server)
          .post('/owners')
          .send({ name: "Henry", email: "email@example.org" });
    expect(res.status).toBe(200);
  });

  it('get /', async () => {
    const res = await request(server).get('/owners');
    expect(res.status).toBe(200);
    expect(res.body[1]).toEqual({
      "email": "leadpipe@diningroom.com",
      "id": 2,
      "name": "Colonel Mustard",
    });

  });
});
