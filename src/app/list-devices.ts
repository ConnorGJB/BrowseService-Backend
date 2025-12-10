import { Device } from '../domain/devices';
import { deviceRepo } from '../domain/device-repo';

export type ListDevicesDeps = {
  deviceRepo: DeviceRepo;
};

export type ListDevicesResult = {
  success: boolean;
  data?: Device[];
  error?: string;
};

/**
 * Create a use-case for listing products.
 * Usage:
 *   const result = await listProducts({ productRepo });
 */
export async function listDevices(
  deps: ListDevicesRepo
): Promise<ListDevicesResult> {
  const { productRepo } = deps;

  try {
    const devices = await deviceRepo.list();
    return { success: true, data: devices };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
