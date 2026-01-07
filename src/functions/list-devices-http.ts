import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { listDevices } from '../app/list-devices';
import { makeListDevicesDeps } from '../config/appServices';

const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
});

const listDevicesHandler = async (
  request: HttpRequest
): Promise<HttpResponseInit> => {
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
  methods: ['GET'],
  authLevel: 'anonymous',
  route: 'devices',
  handler: listDevicesHandler,
});
