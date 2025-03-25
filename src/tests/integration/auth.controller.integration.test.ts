import request from 'supertest';
import app from '../../../src/app'; // Certifique-se de que o caminho para o app está correto
import { setupTestDatabase, teardownTestDatabase } from '../../utils/testDatabase'; // Funções utilitárias para configurar o banco de dados de teste

describe('Auth Controller Integration Tests', () => {
  beforeAll(async () => {
    await setupTestDatabase(); // Configura o banco de dados de teste
  });

  afterAll(async () => {
    await teardownTestDatabase(); // Limpa o banco de dados após os testes
  });

  describe('POST /users/login', () => {
    it('should log in a user and return the user object', async () => {
      // Pré-criação de um usuário no banco de dados
      const testUser = {
        email: 'test@example.com',
        password: 'password123',
      };
      await request(app).post('/users').send({ user: testUser });

      // Testa o login
      const response = await request(app)
        .post('/users/login')
        .send({ user: testUser });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('email', testUser.email);
      expect(response.body.user).toHaveProperty('token'); // Certifique-se de que o token é retornado
    });

    it('should return 401 for invalid credentials', async () => {
      const response = await request(app)
        .post('/users/login')
        .send({ user: { email: 'invalid@example.com', password: 'wrongpassword' } });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /user', () => {
    it('should return the current user when authenticated', async () => {
      // Pré-criação de um usuário e obtenção do token
      const testUser = {
        email: 'test@example.com',
        password: 'password123',
      };
      const loginResponse = await request(app)
        .post('/users/login')
        .send({ user: testUser });

      const token = loginResponse.body.user.token;

      // Testa a rota GET /user
      const response = await request(app)
        .get('/user')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('user');
      expect(response.body.user).toHaveProperty('email', testUser.email);
    });

    it('should return 401 if no token is provided', async () => {
      const response = await request(app).get('/user');

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('error');
    });
  });
});