import type { Device } from '../domain/devices';

export const testDevices: Device[] = [
  {
    id: 'dev-001',
    name: 'Seed Device Alpha',
    totalQuantity: 100,
    description: 'A seeded device for local testing',
    updatedAt: new Date(),
  },
  {
    id: 'dev-002',
    name: 'Seed Device Beta',
    totalQuantity: 150,
    description: 'Another seeded device',
    updatedAt: new Date(),
  },
  {
    id: 'dev-003',
    name: 'HP Monitor 24"',
    totalQuantity: 75,
    description: 'Full HD monitor for workstations',
    updatedAt: new Date(),
  },
  {
    id: 'dev-004',
    name: 'Wireless Mouse',
    totalQuantity: 200,
    description: 'Ergonomic wireless mouse',
    updatedAt: new Date(),
  },
  {
    id: 'dev-005',
    name: 'USB-C Hub',
    totalQuantity: 50,
    description: 'Multi-port USB-C adapter',
    updatedAt: new Date(),
  },
];
