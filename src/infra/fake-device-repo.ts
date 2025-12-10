import { Device } from '../domain/devices';
import { DeviceRepo } from '../domain/device-repo';

/**
 * Fake in-memory implementation of ProductRepo for tests and local dev.
 * Not safe for concurrency across processes — intended as a fake.
 */
export class FakeDeviceRepo implements DeviceRepo {
  private store: Map<string, Device> = new Map();

  constructor(initial: Device[] = []) {
    for (const p of initial) this.store.set(p.id, { ...p });
  }

  async getById(id: string): Promise<Device | null> {
    const found = this.store.get(id) ?? null;
    // return a shallow clone to avoid accidental external mutation
    return found ? { ...found } : null;
  }

  async list(): Promise<Device[]> {
    return Array.from(this.store.values()).map((p) => ({ ...p }));
  }

  async save(device: Device): Promise<Device> {
    // upsert semantics: store the product, return the saved copy
    const toStore = { ...device } as Device;
    this.store.set(toStore.id, toStore);
    return { ...toStore };
  }

  async delete(id: string): Promise<void> {
    this.store.delete(id);
  }
}
