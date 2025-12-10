import { Device } from '../domain/devices';
import { DeviceRepo } from '../domain/device-repo';

export type ListDevicesDeps = {
  deviceRepo: DeviceRepo;
};

export type ListDevicesResult = {
  success: boolean;
  data?: Device[];
  error?: string;
};

/*
 * Create a use-case for listing products.
 * Usage:
 *   const result = await listProducts({ productRepo });
 */
export async function listDevices(
  deps: ListDevicesDeps
): Promise<ListDevicesResult> {
  const { deviceRepo } = deps;

  try {
    const devices = await deviceRepo.list();
    return { success: true, data: devices };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}
