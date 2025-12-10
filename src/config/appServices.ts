import { ListDevicesDeps } from '../app/list-devices';
import { UpsertDeviceDeps } from '../app/upsert-devices';
import { DeviceRepo } from '../domain/device-repo';
import type { Device } from '../domain/devices';
import { FakeDeviceRepo } from '../infra/fake-device-repo';

let cachedDeviceRepo: DeviceRepo | null = null;

export const getDeviceRepo = (): DeviceRepo => {
  if (!cachedDeviceRepo) {
    const now = new Date();
    const initialProducts: Device[] = [
      {
        id: 'p-001',
        name: 'Dell Laptop',
        totalQuantity: 100,
        description: 'A seeded example product for local testing.',
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: 'p-002',
        name: 'Seeded Gadget',
        totalQuantity: 150,
        description: 'Another seeded product to get you started.',
        updatedAt: now,
      },
    ];
    cachedDeviceRepo = new FakeDeviceRepo(initialProducts);
  }
  return cachedDeviceRepo;
};

export const makeListDevicesDeps = (): ListDevicesDeps => ({
  deviceRepo: getDeviceRepo(),
});

export const makeUpsertDevicesDeps = (): UpsertDeviceDeps => ({
  deviceRepo: getDeviceRepo(),
  now: () => new Date(),
});
