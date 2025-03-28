// import { createUser, login } from '../../app/routes/auth/auth.service';
// import app from '../../main';
// import request from 'supertest';

// jest.mock('../../app/routes/auth/auth.service');

// describe('Auth Controller - Unit Tests', () => {
//   describe('POST /users - Create User', () => {
//     it('should create a user successfully', async () => {
//       (createUser as jest.Mock).mockResolvedValue({ email: 'test@example.com', token: 'fake-token' });

//       const response = await request(app).post('/api/users').send({
//         user: { email: 'test@example.com', password: 'password123' },
//       });

//       expect(response.status).toBe(201);
//       expect(response.body.user).toHaveProperty('email', 'test@example.com');
//       expect(response.body.user).toHaveProperty('token');
//     });

//     it('should return 400 if email is missing', async () => {
//       const response = await request(app).post('/api/users').send({
//         user: { password: 'password123' },
//       });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('error', 'Email is required');
//     });

//     it('should return 400 if password is missing', async () => {
//       const response = await request(app).post('/api/users').send({
//         user: { email: 'test@example.com' },
//       });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('error', 'Password is required');
//     });

//     it('should return 409 if user already exists', async () => {
//       (createUser as jest.Mock).mockRejectedValue(new Error('User already exists'));

//       const response = await request(app).post('/api/users').send({
//         user: { email: 'test@example.com', password: 'password123' },
//       });

//       expect(response.status).toBe(409);
//       expect(response.body).toHaveProperty('error', 'User already exists');
//     });

//     it('should handle unexpected errors', async () => {
//       (createUser as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

//       const response = await request(app).post('/api/users').send({
//         user: { email: 'test@example.com', password: 'password123' },
//       });

//       expect(response.status).toBe(500);
//       expect(response.body).toHaveProperty('error', 'Unexpected error');
//     });
//   });

//   describe('POST /users/login - Login', () => {
//     it('should log in a user successfully', async () => {
//       (login as jest.Mock).mockResolvedValue({ email: 'test@example.com', token: 'fake-token' });

//       const response = await request(app).post('/users/login').send({
//         user: { email: 'test@example.com', password: 'password123' },
//       });

//       expect(response.status).toBe(200);
//       expect(response.body.user).toHaveProperty('email', 'test@example.com');
//       expect(response.body.user).toHaveProperty('token');
//     });

//     it('should return 401 for invalid credentials', async () => {
//       (login as jest.Mock).mockRejectedValue(new Error('Invalid credentials'));

//       const response = await request(app).post('/users/login').send({
//         user: { email: 'invalid@example.com', password: 'wrongpassword' },
//       });

//       expect(response.status).toBe(401);
//       expect(response.body).toHaveProperty('error', 'Invalid credentials');
//     });

//     it('should return 400 if email is missing', async () => {
//       const response = await request(app).post('/users/login').send({
//         user: { password: 'password123' },
//       });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('error', 'Email is required');
//     });

//     it('should return 400 if password is missing', async () => {
//       const response = await request(app).post('/users/login').send({
//         user: { email: 'test@example.com' },
//       });

//       expect(response.status).toBe(400);
//       expect(response.body).toHaveProperty('error', 'Password is required');
//     });

//     it('should handle unexpected errors', async () => {
//       (login as jest.Mock).mockRejectedValue(new Error('Unexpected error'));

//       const response = await request(app).post('/users/login').send({
//         user: { email: 'test@example.com', password: 'password123' },
//       });

//       expect(response.status).toBe(500);
//       expect(response.body).toHaveProperty('error', 'Unexpected error');
//     });
//   });
// });