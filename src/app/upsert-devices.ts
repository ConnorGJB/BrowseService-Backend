import { Device, createDevice, CreateDeviceParams } from '../domain/devices';
import { DeviceRepo } from '../domain/device-repo';

export type UpsertDeviceDeps = {
  deviceRepo: DeviceRepo;
  now: () => Date;
};

// Backwards-compatible alias (old name)
export type UpsertProductDeps = UpsertDeviceDeps;

export type UpsertDeviceCommand = {
  id: string;
  name: string;
  totalQuantity: number;
  description: string;
};

export type UpsertProductCommand = UpsertDeviceCommand;

export type UpsertDeviceResult = {
  success: boolean;
  data?: Device;
  error?: string;
};

export type UpsertProductResult = UpsertDeviceResult;

/**
 * Create a use-case for upserting a device.
 * This will create a new device or update an existing one.
 * Usage:
 *   const result = await upsertDevice({ deviceRepo, now: () => new Date() }, deviceData);
 */
export async function upsertDevice(
  deps: UpsertDeviceDeps,
  command: UpsertDeviceCommand
): Promise<UpsertDeviceResult> {
  const { deviceRepo, now } = deps;

  try {
    const device = createDevice({
      ...command,
      updatedAt: now(),
    } as CreateDeviceParams);

    const savedDevice = await deviceRepo.save(device);

    return { success: true, data: savedDevice };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

// Keep the old export name for a smooth, incremental refactor
export const upsertProduct = upsertDevice;
