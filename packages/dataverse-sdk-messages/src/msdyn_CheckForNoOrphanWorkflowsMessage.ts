import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CheckForNoOrphanWorkflows message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckForNoOrphanWorkflowsRequestParameters {
  SolutionId?: string;
}

/**
 * msdyn_CheckForNoOrphanWorkflows request message
 *
 * Web API Action: msdyn_CheckForNoOrphanWorkflows
 */
export class msdyn_CheckForNoOrphanWorkflowsRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForNoOrphanWorkflowsResponse>
{
  declare readonly Parameters: Readonly<msdyn_CheckForNoOrphanWorkflowsRequestParameters>;

  constructor(parameters: msdyn_CheckForNoOrphanWorkflowsRequestParameters = {}) {
    super("msdyn_CheckForNoOrphanWorkflows", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForNoOrphanWorkflows`;

    const body = requestBody({
      SolutionId: this.Parameters.SolutionId,
    });

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
    // The body is the complex value, with its @odata.context
    return msdyn_CheckForNoOrphanWorkflowsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CheckForNoOrphanWorkflows action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CheckForNoOrphanWorkflowsResult {
  "@odata.context"?: string;
  Message: string;
  ResultEntities: string;
  ReturnLevel: number;
  ReturnSeverity: number;
  ReturnStatus: number;
}

/**
 * msdyn_CheckForNoOrphanWorkflows response message
 *
 * `result` is the value the msdyn_CheckForNoOrphanWorkflows action returns (see {@link msdyn_CheckForNoOrphanWorkflowsResult}).
 */
export class msdyn_CheckForNoOrphanWorkflowsResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForNoOrphanWorkflowsResult) {
    super("msdyn_CheckForNoOrphanWorkflows");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CheckForNoOrphanWorkflowsResponse {
    return new msdyn_CheckForNoOrphanWorkflowsResponse(
      data as msdyn_CheckForNoOrphanWorkflowsResult
    );
  }
}
