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
];
