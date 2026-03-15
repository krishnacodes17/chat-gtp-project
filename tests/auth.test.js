const request = require('supertest');

jest.mock('../models/User');
const User = require('../models/User');

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'mock-jwt-token'),
  verify: jest.fn(() => ({ id: 'user123' })),
}));

process.env.JWT_SECRET = 'test-secret';

const app = require('../server');

afterEach(() => jest.clearAllMocks());

describe('POST /api/auth/register', () => {
  const validBody = { username: 'testuser', email: 'test@example.com', password: 'password123' };

  it('should register a new user and return 201 with token', async () => {
    User.findOne.mockResolvedValue(null);
    User.create.mockResolvedValue({ _id: 'id1', username: 'testuser', email: 'test@example.com' });

    const res = await request(app).post('/api/auth/register').send(validBody);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token', 'mock-jwt-token');
    expect(res.body.user).toMatchObject({ username: 'testuser', email: 'test@example.com' });
  });

  it('should return 400 for missing username', async () => {
    const { username, ...body } = validBody;
    const res = await request(app).post('/api/auth/register').send(body);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return 400 for invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validBody, email: 'not-an-email' });
    expect(res.status).toBe(400);
  });

  it('should return 400 for short password', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ ...validBody, password: '123' });
    expect(res.status).toBe(400);
  });

  it('should return 409 when email is already registered', async () => {
    User.findOne.mockResolvedValue({ email: 'test@example.com', username: 'other' });

    const res = await request(app).post('/api/auth/register').send(validBody);
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/Email/i);
  });

  it('should return 409 when username is already taken', async () => {
    User.findOne.mockResolvedValue({ email: 'other@example.com', username: 'testuser' });

    const res = await request(app).post('/api/auth/register').send(validBody);
    expect(res.status).toBe(409);
    expect(res.body.message).toMatch(/Username/i);
  });
});

describe('POST /api/auth/login', () => {
  const credentials = { email: 'test@example.com', password: 'password123' };

  it('should login with valid credentials and return 200 with token', async () => {
    const mockUser = {
      _id: 'id1',
      username: 'testuser',
      email: 'test@example.com',
      comparePassword: jest.fn().mockResolvedValue(true),
    };
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });

    const res = await request(app).post('/api/auth/login').send(credentials);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token', 'mock-jwt-token');
    expect(res.body.user).toMatchObject({ email: 'test@example.com' });
  });

  it('should return 401 for wrong password', async () => {
    const mockUser = {
      _id: 'id1',
      username: 'testuser',
      email: 'test@example.com',
      comparePassword: jest.fn().mockResolvedValue(false),
    };
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(mockUser) });

    const res = await request(app).post('/api/auth/login').send(credentials);
    expect(res.status).toBe(401);
  });

  it('should return 401 for non-existent email', async () => {
    User.findOne.mockReturnValue({ select: jest.fn().mockResolvedValue(null) });

    const res = await request(app).post('/api/auth/login').send(credentials);
    expect(res.status).toBe(401);
  });

  it('should return 400 for invalid email format', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'bad-email', password: 'password123' });
    expect(res.status).toBe(400);
  });

  it('should return 400 for missing password', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com' });
    expect(res.status).toBe(400);
  });
});
