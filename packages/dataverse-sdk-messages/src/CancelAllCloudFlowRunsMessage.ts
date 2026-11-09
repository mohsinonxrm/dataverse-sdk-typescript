import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * CancelAllCloudFlowRuns request message
 *
 * Web API Action: CancelAllCloudFlowRuns
 *
 * The first argument is the id of the workflow record to call it on.
 */
export class CancelAllCloudFlowRunsRequest
  extends OrganizationRequest
  implements Executable<CancelAllCloudFlowRunsResponse>
{
  constructor(public workflowId: string) {
    super("CancelAllCloudFlowRuns");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/workflows(${odataLiteral.guid(this.workflowId)})/Microsoft.Dynamics.CRM.CancelAllCloudFlowRuns`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<CancelAllCloudFlowRunsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new CancelAllCloudFlowRunsResponse());
  }
}

/**
 * CancelAllCloudFlowRuns response message
 */
export class CancelAllCloudFlowRunsResponse extends OrganizationResponse {
  constructor() {
    super("CancelAllCloudFlowRuns");
  }

  static fromResponse(_data?: unknown): CancelAllCloudFlowRunsResponse {
    return new CancelAllCloudFlowRunsResponse();
  }
}
