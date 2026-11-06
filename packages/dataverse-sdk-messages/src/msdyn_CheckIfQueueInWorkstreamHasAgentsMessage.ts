import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckIfQueueInWorkstreamHasAgentsResponse as msdyn_CheckIfQueueInWorkstreamHasAgentsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckIfQueueInWorkstreamHasAgentsResponse.fromResponse({});
    return msdyn_CheckIfQueueInWorkstreamHasAgentsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckIfQueueInWorkstreamHasAgents response message
 */
export class msdyn_CheckIfQueueInWorkstreamHasAgentsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfQueueInWorkstreamHasAgentsResponseData) {
    super("msdyn_CheckIfQueueInWorkstreamHasAgents");
  }

  static fromResponse(data: unknown): msdyn_CheckIfQueueInWorkstreamHasAgentsResponse {
    return new msdyn_CheckIfQueueInWorkstreamHasAgentsResponse(
      responseObject<msdyn_CheckIfQueueInWorkstreamHasAgentsResponseData>(data)
    );
  }
}
