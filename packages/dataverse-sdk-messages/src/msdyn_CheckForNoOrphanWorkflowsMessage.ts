import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForNoOrphanWorkflowsResponse as msdyn_CheckForNoOrphanWorkflowsResponseData } from "./types/index.js";

/**
 * msdyn_CheckForNoOrphanWorkflows request message
 *
 * Web API Action: msdyn_CheckForNoOrphanWorkflows
 */
export class msdyn_CheckForNoOrphanWorkflowsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForNoOrphanWorkflowsResponse>
{
  constructor(public solutionId?: string) {
    super("msdyn_CheckForNoOrphanWorkflows");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForNoOrphanWorkflows`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForNoOrphanWorkflowsResponse> {
    const data = await response.json();
    return msdyn_CheckForNoOrphanWorkflowsResponse.fromResponse(data);
  }
}

/**
 * msdyn_CheckForNoOrphanWorkflows response message
 */
export class msdyn_CheckForNoOrphanWorkflowsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForNoOrphanWorkflowsResponseData) {
    super("msdyn_CheckForNoOrphanWorkflows");
  }

  static fromResponse(data: unknown): msdyn_CheckForNoOrphanWorkflowsResponse {
    return new msdyn_CheckForNoOrphanWorkflowsResponse(
      responseObject<msdyn_CheckForNoOrphanWorkflowsResponseData>(data)
    );
  }
}
