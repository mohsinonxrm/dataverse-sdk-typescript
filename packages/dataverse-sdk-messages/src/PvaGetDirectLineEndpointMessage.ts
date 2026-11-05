import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaGetDirectLineEndpoint request message
 *
 * Web API Action: PvaGetDirectLineEndpoint
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
    const data = await response.json();
    return PvaGetDirectLineEndpointResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.botId,
    };
  }
}

/**
 * PvaGetDirectLineEndpoint response message
 */
export class PvaGetDirectLineEndpointResponse extends OrganizationResponse {
  constructor(public result: PvaGetDirectLineEndpointResponse) {
    super("PvaGetDirectLineEndpoint");
  }

  static fromResponse(data: unknown): PvaGetDirectLineEndpointResponse {
    return new PvaGetDirectLineEndpointResponse((data as any).value);
  }
}
