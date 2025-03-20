import { rest } from 'msw';
import { server } from '@/mocks/server';
import { ApiEndpoint } from '@/types/api';

const mockProfile = {
  id: '1',
  email: 'test@example.com',
  full_name: 'Test User',
  phone: '+1234567890',
  role: 'user',
  metadata: {},
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

describe('Profile API', () => {
  it('fetches user profile', async () => {
    const response = await fetch('/api/users/profile', {
      headers: {
        Authorization: 'Bearer mock-token',
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('data');
    expect(data.data).toMatchObject({
      id: expect.any(String),
      email: expect.any(String),
      full_name: expect.any(String),
      phone: expect.any(String),
    });
  });

  it('updates user profile', async () => {
    const updateData = {
      full_name: 'Updated Name',
      phone: '+1987654321',
    };

    const response = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer mock-token',
      },
      body: JSON.stringify(updateData),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('data');
    expect(data.data).toMatchObject(updateData);
  });

  it('handles unauthorized access', async () => {
    // Override the default handler for this test
    server.use(
      rest.get('/api/users/profile', (req, res, ctx) => {
        return res(ctx.status(401), ctx.json({ error: 'Unauthorized' }));
      })
    );

    const response = await fetch('/api/users/profile');
    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data).toHaveProperty('error', 'Unauthorized');
  });

  it('handles validation errors', async () => {
    const invalidData = {
      phone: 'invalid-phone',
    };

    const response = await fetch('/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer mock-token',
      },
      body: JSON.stringify(invalidData),
    });

    expect(response.status).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty('error', 'Invalid input data');
    expect(data).toHaveProperty('details');
  });
}); 