import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from TriggerServiceEndpointCheck action
 */
export interface TriggerServiceEndpointCheckResponse {
  // No content returned
}

/**
 * TriggerServiceEndpointCheck action
 *
 * Bound action
 * Binding parameter: entity (mscrm.serviceendpoint)
 *
 * The first argument is the id of the serviceendpoint record to call it on.
 */
export class TriggerServiceEndpointCheckAction implements Executable<TriggerServiceEndpointCheckResponse> {
  constructor(public readonly serviceendpointId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/serviceendpoints(${this.serviceendpointId})/Microsoft.Dynamics.CRM.TriggerServiceEndpointCheck`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<TriggerServiceEndpointCheckResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as TriggerServiceEndpointCheckResponse;
    return (await response.json()) as TriggerServiceEndpointCheckResponse;
  }
}
