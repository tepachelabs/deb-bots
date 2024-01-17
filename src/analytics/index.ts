import {posthogClient} from "./posthog";
import { v4 as uuidv4 } from 'uuid';


export const analytics = {
  capture: (id: string | undefined, event: string, properties?: Record<string, string>) => {
    if (posthogClient) {
      posthogClient.capture({
        distinctId: id ? id : uuidv4(),
        event,
        properties}
      )
    }
  },
  onShutdown: async () => {
    if (posthogClient) {
      await posthogClient.shutdownAsync()
    }
  }
}
