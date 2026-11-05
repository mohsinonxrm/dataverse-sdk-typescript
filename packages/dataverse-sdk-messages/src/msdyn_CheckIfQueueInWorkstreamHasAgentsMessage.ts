import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckIfQueueInWorkstreamHasAgents request message
 *
 * Web API Action: msdyn_CheckIfQueueInWorkstreamHasAgents
 */
export class msdyn_CheckIfQueueInWorkstreamHasAgentsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckIfQueueInWorkstreamHasAgentsResponse>
{
  constructor() {
    super("msdyn_CheckIfQueueInWorkstreamHasAgents");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfQueueInWorkstreamHasAgents`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<msdyn_CheckIfQueueInWorkstreamHasAgentsResponse> {
    const data = await response.json();
    return msdyn_CheckIfQueueInWorkstreamHasAgentsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckIfQueueInWorkstreamHasAgents response message
 */
export class msdyn_CheckIfQueueInWorkstreamHasAgentsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfQueueInWorkstreamHasAgentsResponse) {
    super("msdyn_CheckIfQueueInWorkstreamHasAgents");
  }

  static fromResponse(data: unknown): msdyn_CheckIfQueueInWorkstreamHasAgentsResponse {
    return new msdyn_CheckIfQueueInWorkstreamHasAgentsResponse((data as any).value);
  }
}
