import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { listDevices } from '../app/list-devices';
import { makeListDevicesDeps } from '../config/appServices';

const listDevicesHandler = async (
  _request: HttpRequest
): Promise<HttpResponseInit> => {
  const deps = makeListDevicesDeps();
  const result = await listDevices(deps);

  if (!result.success) {
    return {
      status: 500,
      jsonBody: {
        success: false,
        message: 'Failed to list devieces',
        error: result.error,
      },
    };
  }

  const devices = result.data ?? [];
  return {
    status: 200,
    jsonBody: devices.map((devices) => ({
      ...devices,
      updatedAt: devices.updatedAt.toISOString(),
    })),
  };
};

app.http('listProductsHttp', {
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'products',
  handler: listDevicesHandler,
});
