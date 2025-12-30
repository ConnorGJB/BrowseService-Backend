/**
 * Cosmos DB Device Repository Adapter
 * Infrastructure Layer - Clean Architecture
 *
 * Implements the DeviceRepo interface using Azure Cosmos DB.
 * Uses a single options parameter for configuration.
 */

import type { Device } from '../domain/devices';
import type { DeviceRepo } from '../domain/device-repo';
import { CosmosClient, Container } from '@azure/cosmos';

export type CosmosDeviceRepoOptions = {
  endpoint: string;
  key: string;
  databaseId: string;
  containerId: string;
};

// DTO persisted to Cosmos DB
// Keep this decoupled from the domain model (dates are strings in storage)
export type CosmosDeviceDocument = {
  id: string; // also used as partition key per container config ("/id")
  name: string;
  totalQuantity: number;
  description: string;
  updatedAt: string; // ISO 8601 string
};

export class CosmosDeviceRepository implements DeviceRepo {
  private client: CosmosClient;
  private container: Container;

  constructor(private readonly options: CosmosDeviceRepoOptions) {
    const missing: string[] = [];
    if (!options.endpoint) missing.push('endpoint');
    if (!options.key) missing.push('key');
    if (!options.databaseId) missing.push('databaseId');
    if (!options.containerId) missing.push('containerId');
    if (missing.length > 0) {
      throw new Error(
        `CosmosDeviceRepository: Missing required options: ${missing.join(
          ', '
        )}`
      );
    }
    this.client = new CosmosClient({
      endpoint: options.endpoint,
      key: options.key,
    });
    this.container = this.client
      .database(options.databaseId)
      .container(options.containerId);
  }

  async getById(id: string): Promise<Device | null> {
    try {
      const { resource } = await this.container
        .item(id, id)
        .read<CosmosDeviceDocument>();
      return resource ? fromDocument(resource) : null;
    } catch (err: any) {
      if (err.code === 404) return null;
      throw err;
    }
  }

  async list(): Promise<Device[]> {
    const query = 'SELECT * FROM c';
    const { resources } = await this.container.items
      .query<CosmosDeviceDocument>(query)
      .fetchAll();
    return resources.map(fromDocument);
  }

  async save(device: Device): Promise<Device> {
    const doc = toDocument(device);
    await this.container.items.upsert<CosmosDeviceDocument>(doc);
    return device;
  }

  async delete(id: string): Promise<void> {
    try {
      await this.container.item(id, id).delete();
    } catch (err: any) {
      if (err.code === 404) return;
      throw err;
    }
  }

  // Optional helper retained for convenience
  async exists(id: string): Promise<boolean> {
    try {
      const { resource } = await this.container
        .item(id, id)
        .read<CosmosDeviceDocument>();
      return !!resource;
    } catch (err: any) {
      if (err.code === 404) return false;
      throw err;
    }
  }
}

// Mapping helpers between domain and persistence representations
const toDocument = (device: Device): CosmosDeviceDocument => ({
  id: device.id,
  name: device.name,
  totalQuantity: device.totalQuantity,
  description: device.description,
  updatedAt: device.updatedAt.toISOString(),
});

const fromDocument = (doc: CosmosDeviceDocument): Device => ({
  id: doc.id,
  name: doc.name,
  totalQuantity: doc.totalQuantity,
  description: doc.description,
  updatedAt: new Date(doc.updatedAt),
});
