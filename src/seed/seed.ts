import { getDeviceRepo } from '../config/appServices';
import { testDevices } from './test-devices';
import type { Device } from '../domain/devices';

/**
 * Simple seeding script that uses repository abstraction to persist devices.
 * Note: `getDeviceRepo()` currently returns a fake in-memory repo. To seed a
 * real database, replace the repo implementation to a Cosmos repository and
 * configure required environment variables.
 */
async function seed(): Promise<void> {
  const repo = getDeviceRepo();

  console.log(`Seeding ${testDevices.length} devices...`);

  for (const d of testDevices) {
    try {
      const saved = await repo.save(d as Device);
      console.log(`Saved device: ${saved.id}`);
    } catch (err) {
      console.error(`Failed to save device ${d.id}:`, (err as Error).message);
    }
  }

  console.log('Seeding finished.');
}

// Run when executed directly
if (require.main === module) {
  seed().catch((err) => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
}

export default seed;
