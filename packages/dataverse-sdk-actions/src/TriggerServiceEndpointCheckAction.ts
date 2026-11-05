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
    // No return value (204 No Content)
    return {};
  }
}
