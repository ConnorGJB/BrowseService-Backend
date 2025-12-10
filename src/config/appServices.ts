import { ListDevicesDeps } from '../app/list-devices';
import { UpsertDeviceDeps } from '../app/upsert-devices';
import { DeviceRepo } from '../domain/device-repo';
import type { Product } from '../domain/product';
import { FakeProductRepo } from '../infra/fake-product-repo';

let cachedDeviceRepo: DeviceRepo | null = null;

export const getDeviceRepo = (): DeviceRepo => {
  if (!cachedDeviceRepo) {
    const now = new Date();
    const initialProducts: Product[] = [
      {
        id: 'p-001',
        name: 'Seeded Widget',
        pricePence: 1299,
        description: 'A seeded example product for local testing.',
        updatedAt: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 day ago
      },
      {
        id: 'p-002',
        name: 'Seeded Gadget',
        pricePence: 2599,
        description: 'Another seeded product to get you started.',
        updatedAt: now,
      },
    ];
    cachedDeviceRepo = new FakeProductRepo(initialProducts);
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
