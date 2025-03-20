import { rest } from 'msw';
import { ApiEndpoint } from '@/types/api';

// Mock data
const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'user',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockSystem = {
  id: '1',
  name: 'Test System',
  description: 'Test System Description',
  userId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const mockApplication = {
  id: '1',
  name: 'Test Application',
  description: 'Test Application Description',
  systemId: '1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// Auth handlers
const authHandlers = [
  rest.post(`${ApiEndpoint.Auth}/login`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        user: mockUser,
        token: 'mock-token',
      })
    );
  }),

  rest.post(`${ApiEndpoint.Auth}/register`, (req, res, ctx) => {
    return res(
      ctx.status(201),
      ctx.json({
        user: mockUser,
        token: 'mock-token',
      })
    );
  }),

  rest.post(`${ApiEndpoint.Auth}/logout`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),

  rest.post(`${ApiEndpoint.Auth}/refresh`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        token: 'mock-refresh-token',
      })
    );
  }),
];

// User handlers
const userHandlers = [
  rest.get(`${ApiEndpoint.Users}/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUser));
  }),

  rest.put(`${ApiEndpoint.Users}/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockUser));
  }),

  rest.delete(`${ApiEndpoint.Users}/me`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];

// System handlers
const systemHandlers = [
  rest.get(`${ApiEndpoint.Systems}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([mockSystem]));
  }),

  rest.get(`${ApiEndpoint.Systems}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSystem));
  }),

  rest.post(`${ApiEndpoint.Systems}`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(mockSystem));
  }),

  rest.put(`${ApiEndpoint.Systems}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockSystem));
  }),

  rest.delete(`${ApiEndpoint.Systems}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];

// Application handlers
const applicationHandlers = [
  rest.get(`${ApiEndpoint.Applications}`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json([mockApplication]));
  }),

  rest.get(`${ApiEndpoint.Applications}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockApplication));
  }),

  rest.post(`${ApiEndpoint.Applications}`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json(mockApplication));
  }),

  rest.put(`${ApiEndpoint.Applications}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockApplication));
  }),

  rest.delete(`${ApiEndpoint.Applications}/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ success: true }));
  }),
];

// Error handlers
const errorHandlers = [
  rest.all('*', (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: 'Not Found',
        message: 'The requested resource was not found',
      })
    );
  }),
];

// Combine all handlers
export const handlers = [
  ...authHandlers,
  ...userHandlers,
  ...systemHandlers,
  ...applicationHandlers,
  ...errorHandlers,
];
