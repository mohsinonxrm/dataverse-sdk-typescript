import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the ReleaseToQueue action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ReleaseToQueueResponse = void;

/**
 * ReleaseToQueue action
 *
 * Bound action
 * Binding parameter: entity (mscrm.queueitem)
 *
 * The first argument is the id of the queueitem record to call it on.
 */
export class ReleaseToQueueAction implements Executable<ReleaseToQueueResponse> {
  constructor(public readonly queueitemId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/queueitems(${this.queueitemId})/Microsoft.Dynamics.CRM.ReleaseToQueue`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<ReleaseToQueueResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
