require('dotenv').config();
const supertest = require('supertest');

const { server } = require('../src/server');
const request = supertest(server);

describe('Testing the routes', () => {
  it('Should be able to return posts concerning one tag', async () => {
    const response = await request.get('/api/posts').query({ tags: 'tech' });
    expect(response.status).toBe(200);
  });

  it('Should be able to return posts concerning multiple tags', async () => {
    const response = await request.get('/api/posts').query({ tags: 'tech,health' });
    expect(response.status).toBe(200);
  });

  it('Should return a code 400 if there is nothing in the tags query/no tags query', async () => {
    const response = await request.get('/api/posts');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Tags parameter is required');
  });

  it('Should return a code 400 if there is an invalid sortBy query', async () => {
    const response = await request.get('/api/posts').query({ tags: 'tech', sortBy: 'author' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('sortBy parameter is invalid');
  });

  it('Should return a code 400 if there is an invalid direction query', async () => {
    const response = await request.get('/api/posts').query({ tags: 'tech', direction: 'up' });
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('direction parameter is invalid');
  });
});
