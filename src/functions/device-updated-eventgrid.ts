import { app, EventGridEvent, InvocationContext } from '@azure/functions';

type DeviceData = {
  id: string;
  name: string;
  totalQuantity: number;
  category: string;
  description: string;
  updatedAt: Date;
};

type DeviceUpdatedCloudEvent = {
  specversion: string;
  type: string;
  source: string;
  subject: string;
  id: string;
  time: string;
  datacontenttype: string;
  data: DeviceData;
};

export async function deviceUpdatedEventGrid(
  event: EventGridEvent,
  context: InvocationContext
): Promise<void> {
  // Log the event for demonstration purposes
  context.log(
    'Event Grid function processed event:',
    JSON.stringify(event, null, 2)
  );

  // The event body contains the CloudEvent
  const cloudEvent = event as unknown as DeviceUpdatedCloudEvent;

  // TODO: should pass event to an application layer use case to handle
}

app.eventGrid('deviceUpdatedEventGrid', {
  handler: deviceUpdatedEventGrid,
});
