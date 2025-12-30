import { app, HttpRequest, HttpResponseInit } from '@azure/functions';
import { upsertDevice } from '../app/upsert-devices';
import { makeUpsertDevicesDeps } from '../config/appServices';

const getCorsHeaders = () => ({});

const upsertDeviceHandler = async (
  request: HttpRequest
): Promise<HttpResponseInit> => {
  if (request.method === 'OPTIONS') {
    return { status: 204, headers: getCorsHeaders() };
  }

  try {
    const body = (await request.json()) as any;

    // Validate required fields
    if (!body || typeof body !== 'object') {
      return {
        status: 400,
        jsonBody: {
          success: false,
          message: 'Request body is required',
        },
      };
    }

    const { id, name, totalQuantity, description } = body;

    if (!id || !name || totalQuantity === undefined || !description) {
      return {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders() },
        jsonBody: {
          success: false,
          message:
            'Missing required fields: id, name, totalQuantity, description',
        },
      };
    }

    const deps = makeUpsertDevicesDeps();
    const result = await upsertDevice(deps, {
      id,
      name,
      totalQuantity,
      description,
    });

    if (!result.success) {
      return {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...getCorsHeaders() },
        jsonBody: {
          success: false,
          message: 'Failed to upsert device',
          error: result.error,
        },
      };
    }

    return {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...getCorsHeaders() },
      jsonBody: {
        ...result.data,
        updatedAt: result.data?.updatedAt.toISOString(),
      },
    };
  } catch (error) {
    return {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...getCorsHeaders() },
      jsonBody: {
        success: false,
        message: 'Internal server error',
        error: (error as Error).message,
      },
    };
  }
};

app.http('upsertDeviceHttp', {
  methods: ['PUT', 'POST'],
  authLevel: 'anonymous',
  route: 'catalogue-items',
  handler: upsertDeviceHandler,
});
