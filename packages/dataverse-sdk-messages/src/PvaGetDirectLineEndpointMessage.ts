import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PvaGetDirectLineEndpointResponse as PvaGetDirectLineEndpointResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return PvaGetDirectLineEndpointResponse.fromResponse({});
    return PvaGetDirectLineEndpointResponse.fromResponse(await response.json());
  }
}

/**
 * PvaGetDirectLineEndpoint response message
 */
export class PvaGetDirectLineEndpointResponse extends OrganizationResponse {
  constructor(public result: PvaGetDirectLineEndpointResponseData) {
    super("PvaGetDirectLineEndpoint");
  }

  static fromResponse(data: unknown): PvaGetDirectLineEndpointResponse {
    return new PvaGetDirectLineEndpointResponse(
      responseObject<PvaGetDirectLineEndpointResponseData>(data)
    );
  }
}
