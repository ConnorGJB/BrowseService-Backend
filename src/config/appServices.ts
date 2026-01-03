import { ListDevicesDeps } from '../app/list-devices';
import { UpsertDeviceDeps } from '../app/upsert-devices';
import { DeviceRepo } from '../domain/device-repo';
import { FakeDeviceRepo } from '../infra/fake-device-repo';
import { testDevices } from '../seed/test-devices';

let cachedDeviceRepo: DeviceRepo | null = null;

export const getDeviceRepo = (): DeviceRepo => {
  if (!cachedDeviceRepo) {
    cachedDeviceRepo = new FakeDeviceRepo(testDevices);
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
