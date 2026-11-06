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
 *
 * The first argument is the id of the bot record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PvaGetDirectLineEndpointResponse;
  }
}
