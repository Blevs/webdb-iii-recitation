const server = require('../server.js');
const request = require('supertest');
// const db = require('../data/db.js');
const prepTestDB = require('../helpers/prepTestDB.js');
const restrict = require('../middleware/restrict.js');
jest.mock('../middleware/restrict.js');

beforeEach(prepTestDB);
beforeEach(() => restrict.mockClear());

describe('pets', () => {
  it('get /', async () => {
    restrict.mockImplementationOnce((req, res, next) => {
      console.log("I ran this test");
      req.user = { id: 1 };
      next();
    });
    const res = await request(server)
          .get('/pets');
    expect(res.status).toBe(200);
    expect(restrict).toBeCalled();
  });
  // not restricted
  it('get /:id', async () => {
    const res = await request(server)
          .get('/pets/1');
    expect(res.status).toBe(200);
    expect(restrict).not.toBeCalled();
  });
  it('get /:id 404', async () => {
    const res = await request(server)
          .get('/pets/900');
    expect(res.status).toBe(404);
    expect(restrict).not.toBeCalled();
  });
});
