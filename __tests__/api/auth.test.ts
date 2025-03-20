import { rest } from 'msw';
import { server } from '@/mocks/server';
import { ApiEndpoint } from '@/types/api';

describe('Auth API', () => {
  it('handles successful login', async () => {
    const response = await fetch(`${ApiEndpoint.Auth}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123',
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('user');
    expect(data).toHaveProperty('token');
    expect(data.user.email).toBe('test@example.com');
  });

  it('handles successful registration', async () => {
    const response = await fetch(`${ApiEndpoint.Auth}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
      }),
    });

    expect(response.status).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty('user');
    expect(data).toHaveProperty('token');
    expect(data.user.email).toBe('new@example.com');
    expect(data.user.name).toBe('New User');
  });

  it('handles successful logout', async () => {
    const response = await fetch(`${ApiEndpoint.Auth}/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer mock-token',
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('success', true);
  });

  it('handles token refresh', async () => {
    const response = await fetch(`${ApiEndpoint.Auth}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer mock-token',
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('token');
  });

  it('handles invalid credentials', async () => {
    // Override the default handler for this test
    server.use(
      rest.post(`${ApiEndpoint.Auth}/login`, (req, res, ctx) => {
        return res(
          ctx.status(401),
          ctx.json({
            error: 'Invalid credentials',
            message: 'Email or password is incorrect',
          })
        );
      })
    );

    const response = await fetch(`${ApiEndpoint.Auth}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      }),
    });

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toHaveProperty('error', 'Invalid credentials');
    expect(data).toHaveProperty('message');
  });
});
