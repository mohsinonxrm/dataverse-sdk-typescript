import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CheckForNoOrphanWorkflowsResponse as msdyn_CheckForNoOrphanWorkflowsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CheckForNoOrphanWorkflowsResponse.fromResponse({});
    return msdyn_CheckForNoOrphanWorkflowsResponse.fromResponse(await response.json());
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
