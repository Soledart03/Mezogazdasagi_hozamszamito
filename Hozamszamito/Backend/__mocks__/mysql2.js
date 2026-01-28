// __mocks__/mysql2.js
const mockQuery = jest.fn();

module.exports = {
  createConnection: jest.fn(() => ({
    connect: jest.fn((cb) => cb && cb(null)),
    query: mockQuery
  })),
  __mockQuery: mockQuery  // így könnyen elérjük a tesztből
};
