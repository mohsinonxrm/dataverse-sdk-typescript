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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckIfQueueInWorkstreamHasAgentsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckIfQueueInWorkstreamHasAgents action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckIfQueueInWorkstreamHasAgentsResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
}

/**
 * msdyn_CheckIfQueueInWorkstreamHasAgents response message
 *
 * `result` is the value the msdyn_CheckIfQueueInWorkstreamHasAgents action returns (see {@link msdyn_CheckIfQueueInWorkstreamHasAgentsResult}).
 */
export class msdyn_CheckIfQueueInWorkstreamHasAgentsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckIfQueueInWorkstreamHasAgentsResult) {
    super("msdyn_CheckIfQueueInWorkstreamHasAgents");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckIfQueueInWorkstreamHasAgentsResponse {
    return new msdyn_CheckIfQueueInWorkstreamHasAgentsResponse(
      data as msdyn_CheckIfQueueInWorkstreamHasAgentsResult
    );
  }
}
