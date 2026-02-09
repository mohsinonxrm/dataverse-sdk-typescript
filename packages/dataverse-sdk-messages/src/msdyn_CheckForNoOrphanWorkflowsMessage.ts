import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckForNoOrphanWorkflows request message
 *
 * Web API Action: msdyn_CheckForNoOrphanWorkflows
 */
export class msdyn_CheckForNoOrphanWorkflowsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForNoOrphanWorkflowsResponse>
{
  constructor(public solutionId: string) {
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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForNoOrphanWorkflowsResponse> {
    const data = await response.json();
    return msdyn_CheckForNoOrphanWorkflowsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionId: this.solutionId,
    };
  }
}

/**
 * msdyn_CheckForNoOrphanWorkflows response message
 */
export class msdyn_CheckForNoOrphanWorkflowsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForNoOrphanWorkflowsResponse) {
    super("msdyn_CheckForNoOrphanWorkflows");
  }

  static fromResponse(data: unknown): msdyn_CheckForNoOrphanWorkflowsResponse {
    return new msdyn_CheckForNoOrphanWorkflowsResponse((data as any).value);
  }
}
