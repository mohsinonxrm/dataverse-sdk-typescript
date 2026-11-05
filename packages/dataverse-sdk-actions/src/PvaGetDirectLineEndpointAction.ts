import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaGetDirectLineEndpoint action
 */
export interface PvaGetDirectLineEndpointResponse {
  Endpoint: string;
}

/**
 * PvaGetDirectLineEndpoint action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 */
export class PvaGetDirectLineEndpointAction implements Executable<PvaGetDirectLineEndpointResponse> {
  constructor(public readonly botId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaGetDirectLineEndpoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetDirectLineEndpointResponse> {
    const data = await response.json();
    return data as PvaGetDirectLineEndpointResponse;
  }
}
