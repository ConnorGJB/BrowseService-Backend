import { describe, it, expect } from 'vitest';
import { listDevices } from './list-devices';
import { FakeDeviceRepo } from '../infra/fake-device-repo';
import { Device } from '../domain/devices';

describe('listProducts', () => {
  it('should return empty array when no products exist', async () => {
    // Arrange
    const deviceRepo = new FakeDeviceRepo();

    // Act
    const result = await listDevices({ deviceRepo });

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toEqual([]);
  });

  it('should return all devices from the repository', async () => {
    // Arrange
    const devices: Device[] = [
      {
        id: 'prod-1',
        name: 'Product 1',
        totalQuantity: 1000,
        category: 'Electronics',
        description: 'First product',
        updatedAt: new Date('2025-01-01'),
      },
      {
        id: 'prod-2',
        name: 'Product 2',
        totalQuantity: 2000,
        category: 'Hardware',
        description: 'Second product',
        updatedAt: new Date('2025-01-02'),
      },
    ];
    const deviceRepo = new FakeDeviceRepo(devices);

    // Act
    const result = await listDevices({ deviceRepo });

    // Assert
    expect(result.success).toBe(true);
    expect(result.data).toHaveLength(2);
    expect(result.data).toEqual(devices);
  });

  describe('error scenarios', () => {
    // Error scenario tests can be added here
    it.todo('should handle repository errors gracefully');
  });
});
