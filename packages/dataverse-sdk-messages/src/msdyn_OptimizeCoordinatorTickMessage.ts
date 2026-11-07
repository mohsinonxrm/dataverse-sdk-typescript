import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_OptimizeCoordinatorTick message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OptimizeCoordinatorTickRequestParameters {
  WorkflowRunId?: string;
  LeaseOwner?: string;
}

/**
 * msdyn_OptimizeCoordinatorTick request message
 *
 * Web API Action: msdyn_OptimizeCoordinatorTick
 */
export class msdyn_OptimizeCoordinatorTickRequest
  extends OrganizationRequest
  implements Executable<msdyn_OptimizeCoordinatorTickResponse>
{
  declare readonly Parameters: Readonly<msdyn_OptimizeCoordinatorTickRequestParameters>;

  constructor(parameters: msdyn_OptimizeCoordinatorTickRequestParameters = {}) {
    super("msdyn_OptimizeCoordinatorTick", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OptimizeCoordinatorTick`;

    const body = requestBody({
      WorkflowRunId: this.Parameters.WorkflowRunId,
      LeaseOwner: this.Parameters.LeaseOwner,
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

  async parseResponse(response: Response): Promise<msdyn_OptimizeCoordinatorTickResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_OptimizeCoordinatorTickResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_OptimizeCoordinatorTick action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_OptimizeCoordinatorTickResult {
  "@odata.context"?: string;
  ResultJson: string;
}

/**
 * msdyn_OptimizeCoordinatorTick response message
 *
 * `result` is the value the msdyn_OptimizeCoordinatorTick action returns (see {@link msdyn_OptimizeCoordinatorTickResult}).
 */
export class msdyn_OptimizeCoordinatorTickResponse extends OrganizationResponse {
  constructor(public result: msdyn_OptimizeCoordinatorTickResult) {
    super("msdyn_OptimizeCoordinatorTick");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_OptimizeCoordinatorTickResponse {
    return new msdyn_OptimizeCoordinatorTickResponse(data as msdyn_OptimizeCoordinatorTickResult);
  }
}
