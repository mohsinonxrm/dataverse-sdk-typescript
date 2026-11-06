import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CreateResourceOptimizationRequest message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateResourceOptimizationRequestRequestParameters {
  ResourceIds: string;
  StartDate: string;
  EndDate: string;
  GoalId?: string;
  IsSimulation?: boolean;
  OptimizationRequestId?: string;
}

/**
 * msdyn_CreateResourceOptimizationRequest request message
 *
 * Web API Action: msdyn_CreateResourceOptimizationRequest
 */
export class msdyn_CreateResourceOptimizationRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateResourceOptimizationRequestResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateResourceOptimizationRequestRequestParameters>;

  constructor(parameters: msdyn_CreateResourceOptimizationRequestRequestParameters) {
    super("msdyn_CreateResourceOptimizationRequest", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateResourceOptimizationRequest`;

    const body = requestBody({
      ResourceIds: this.Parameters.ResourceIds,
      StartDate: this.Parameters.StartDate,
      EndDate: this.Parameters.EndDate,
      GoalId: this.Parameters.GoalId,
      IsSimulation: this.Parameters.IsSimulation,
      OptimizationRequestId: this.Parameters.OptimizationRequestId,
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

  parseResponse(_response: Response): Promise<msdyn_CreateResourceOptimizationRequestResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CreateResourceOptimizationRequestResponse());
  }
}

/**
 * msdyn_CreateResourceOptimizationRequest response message
 */
export class msdyn_CreateResourceOptimizationRequestResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CreateResourceOptimizationRequest");
  }

  static fromResponse(_data?: unknown): msdyn_CreateResourceOptimizationRequestResponse {
    return new msdyn_CreateResourceOptimizationRequestResponse();
  }
}
