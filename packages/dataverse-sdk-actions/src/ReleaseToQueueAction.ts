import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ReleaseToQueue action
 */
export interface ReleaseToQueueResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<ReleaseToQueueResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ReleaseToQueueResponse;
    return (await response.json()) as ReleaseToQueueResponse;
  }
}
