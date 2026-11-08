import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PvaGetDirectLineEndpoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaGetDirectLineEndpointResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/bots(${odataLiteral.guid(this.botId)})/Microsoft.Dynamics.CRM.PvaGetDirectLineEndpoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaGetDirectLineEndpointResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PvaGetDirectLineEndpointResponse;
  }
}
