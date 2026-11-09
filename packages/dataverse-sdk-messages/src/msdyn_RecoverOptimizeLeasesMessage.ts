import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RecoverOptimizeLeases message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RecoverOptimizeLeasesRequestParameters {
  WorkflowRunId?: string;
  LeaseOwner?: string;
  MaxItems?: number;
}

/**
 * msdyn_RecoverOptimizeLeases request message
 *
 * Web API Action: msdyn_RecoverOptimizeLeases
 */
export class msdyn_RecoverOptimizeLeasesRequest
  extends OrganizationRequest
  implements Executable<msdyn_RecoverOptimizeLeasesResponse>
{
  declare readonly Parameters: Readonly<msdyn_RecoverOptimizeLeasesRequestParameters>;

  constructor(parameters: msdyn_RecoverOptimizeLeasesRequestParameters = {}) {
    super("msdyn_RecoverOptimizeLeases", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RecoverOptimizeLeases`;

    const body = requestBody({
      WorkflowRunId: this.Parameters.WorkflowRunId,
      LeaseOwner: this.Parameters.LeaseOwner,
      MaxItems: this.Parameters.MaxItems,
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

  async parseResponse(response: Response): Promise<msdyn_RecoverOptimizeLeasesResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RecoverOptimizeLeasesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RecoverOptimizeLeases action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RecoverOptimizeLeasesResult {
  "@odata.context"?: string;
  ResultJson: string;
}

/**
 * msdyn_RecoverOptimizeLeases response message
 *
 * `result` is the value the msdyn_RecoverOptimizeLeases action returns (see {@link msdyn_RecoverOptimizeLeasesResult}).
 */
export class msdyn_RecoverOptimizeLeasesResponse extends OrganizationResponse {
  constructor(public result: msdyn_RecoverOptimizeLeasesResult) {
    super("msdyn_RecoverOptimizeLeases");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RecoverOptimizeLeasesResponse {
    return new msdyn_RecoverOptimizeLeasesResponse(data as msdyn_RecoverOptimizeLeasesResult);
  }
}
