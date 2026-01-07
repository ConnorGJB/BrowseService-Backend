import type { Device } from '../domain/devices';

export const testDevices: Device[] = [
  {
    id: 'dev-001',
    name: 'Seed Device Alpha',
    totalQuantity: 100,
    category: 'General',
    description: 'A seeded device for local testing',
    updatedAt: new Date(),
  },
  {
    id: 'dev-002',
    name: 'Seed Device Beta',
    totalQuantity: 150,
    category: 'General',
    description: 'Another seeded device',
    updatedAt: new Date(),
  },
  {
    id: 'dev-003',
    name: 'HP Monitor 24"',
    totalQuantity: 75,
    category: 'Monitor',
    description: 'Full HD monitor for workstations',
    updatedAt: new Date(),
  },
  {
    id: 'dev-004',
    name: 'Wireless Mouse',
    totalQuantity: 200,
    category: 'Peripherals',
    description: 'Ergonomic wireless mouse',
    updatedAt: new Date(),
  },
  {
    id: 'dev-005',
    name: 'USB-C Hub',
    totalQuantity: 50,
    category: 'Accessories',
    description: 'Multi-port USB-C adapter',
    updatedAt: new Date(),
  },
];
