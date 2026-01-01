import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { listDevices } from '../app/list-devices';
import { makeListDevicesDeps } from '../config/appServices';

const getCorsHeaders = () => ({});

const listDevicesHandler = async (
  request: HttpRequest
): Promise<HttpResponseInit> => {
  if (request.method === 'OPTIONS') {
    return { status: 204, headers: getCorsHeaders() };
  }

  const deps = makeListDevicesDeps();
  const result = await listDevices(deps);

  if (!result.success) {
    return {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...getCorsHeaders() },
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
    headers: { 'Content-Type': 'application/json', ...getCorsHeaders() },
    jsonBody: devices.map((devices) => ({
      ...devices,
      updatedAt: devices.updatedAt.toISOString(),
    })),
  };
};

app.http('listDevicesHttp', {
  methods: ['GET', 'OPTIONS'],
  authLevel: 'anonymous',
  route: 'devices',
  handler: listDevicesHandler,
});
