import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaGetDirectLineEndpoint request message
 *
 * Web API Action: PvaGetDirectLineEndpoint
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaGetDirectLineEndpointRequest
  extends OrganizationRequest
  implements Executable<PvaGetDirectLineEndpointResponse>
{
  constructor(public botId: string) {
    super("PvaGetDirectLineEndpoint");
  }

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
    // The body is the complex value, with its @odata.context
    return PvaGetDirectLineEndpointResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PvaGetDirectLineEndpoint action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaGetDirectLineEndpointResult {
  "@odata.context"?: string;
  Endpoint: string;
}

/**
 * PvaGetDirectLineEndpoint response message
 *
 * `result` is the value the PvaGetDirectLineEndpoint action returns (see {@link PvaGetDirectLineEndpointResult}).
 */
export class PvaGetDirectLineEndpointResponse extends OrganizationResponse {
  constructor(public result: PvaGetDirectLineEndpointResult) {
    super("PvaGetDirectLineEndpoint");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PvaGetDirectLineEndpointResponse {
    return new PvaGetDirectLineEndpointResponse(data as PvaGetDirectLineEndpointResult);
  }
}
