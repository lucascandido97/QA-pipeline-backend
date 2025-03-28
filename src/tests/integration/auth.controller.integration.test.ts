import request from 'supertest';
import app from '../../main';

describe('Auth Controller - Integration Tests', () => {
  describe('POST /users - Create User', () => {
    it('should create a user (Smoke Test)', async () => {
      const response = await request(app).post('/api/users').send({
        user: { email: 'test@example.com', username: 'testUsername', password: 'password123' },
      });

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).toHaveProperty('token');
    });

    it('should return 400 if email is missing (Regression Test - High Priority)', async () => {
      const response = await request(app).post('/api/users').send({
        user: { password: 'password123' },
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email is required');
    });

    it('should return 409 if user already exists (Regression Test - Medium Priority)', async () => {
      await request(app).post('/api/users').send({
        user: { email: 'duplicate@example.com', password: 'password123' },
      });

      const response = await request(app).post('/api/users').send({
        user: { email: 'duplicate@example.com', password: 'password123' },
      });

      expect(response.status).toBe(409);
      expect(response.body).toHaveProperty('error', 'User already exists');
    });
  });

  describe('POST /users/login - Login', () => {
    it('should log in a user (Smoke Test)', async () => {
      const response = await request(app).post('/api/users/login').send({
        user: { email: 'test@example.com', password: 'password123' },
      });

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).toHaveProperty('token');
    });

    it('should return 401 for invalid credentials (Sanity Test)', async () => {
      const response = await request(app).post('/api/users/login').send({
        user: { email: 'invalid@example.com', password: 'wrongpassword' },
      });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error', 'Invalid credentials');
    });

    it('should return 400 if email is missing (Regression Test - High Priority)', async () => {
      const response = await request(app).post('/api/users/login').send({
        user: { password: 'password123' },
      });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Email is required');
    });
  });

  describe('GET /user - Get Current User', () => {
    it('should return the current user when authenticated (Smoke Test)', async () => {
      const loginResponse = await request(app).post('/api/users/login').send({
        user: { email: 'test@example.com', password: 'password123' },
      });

      const token = loginResponse.body.user.token;

      const response = await request(app).get('/api/user').set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
    });

    it('should return 401 when not authenticated (Sanity Test)', async () => {
      const response = await request(app).get('/api/user');

      expect(response.status).toBe(401);
    });
  });
});