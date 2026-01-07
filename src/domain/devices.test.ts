import { describe, it, expect } from 'vitest';
import { createDevice, DeviceError } from './devices';

describe('createDevice', () => {
  describe('valid device creation', () => {
    it('should create a device with valid parameters', () => {
      // Arrange
      const params = {
        id: 'prod-123',
        name: 'Test device',
        totalQuantity: 1999,
        category: 'Electronics',
        description: 'A great test product',
        updatedAt: new Date('2025-01-01'),
      };

      // Act
      const device = createDevice(params);

      // Assert
      expect(device).toEqual(params);
    });

    // TODO: Additional valid creation tests can be added here (e.g. check zero price)
  });

  describe('id validation', () => {
    it('should throw ProductError when id is only whitespace', () => {
      // Arrange
      const params = {
        id: '   ',
        name: 'Test device',
        totalQuantity: 1999,
        category: 'Electronics',
        description: 'A test device',
        updatedAt: new Date(),
      };

      // Act
      const act = () => createDevice(params);

      // Assert
      expect(act).toThrow(DeviceError);
    });

    // TODO: Additional validation tests can be added here
  });
});
