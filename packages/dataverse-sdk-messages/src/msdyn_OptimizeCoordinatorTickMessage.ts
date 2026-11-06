import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_OptimizeCoordinatorTickResponse as msdyn_OptimizeCoordinatorTickResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_OptimizeCoordinatorTickResponse.fromResponse({});
    return msdyn_OptimizeCoordinatorTickResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_OptimizeCoordinatorTick response message
 */
export class msdyn_OptimizeCoordinatorTickResponse extends OrganizationResponse {
  constructor(public result: msdyn_OptimizeCoordinatorTickResponseData) {
    super("msdyn_OptimizeCoordinatorTick");
  }

  static fromResponse(data: unknown): msdyn_OptimizeCoordinatorTickResponse {
    return new msdyn_OptimizeCoordinatorTickResponse(
      responseObject<msdyn_OptimizeCoordinatorTickResponseData>(data)
    );
  }
}
