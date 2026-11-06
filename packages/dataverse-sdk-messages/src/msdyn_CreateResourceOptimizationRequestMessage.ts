import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CreateResourceOptimizationRequest request message
 *
 * Web API Action: msdyn_CreateResourceOptimizationRequest
 */
export class msdyn_CreateResourceOptimizationRequestRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateResourceOptimizationRequestResponse>
{
  constructor(
    public resourceIds: string,
    public startDate: string,
    public endDate: string,
    public goalId: string,
    public isSimulation: boolean,
    public optimizationRequestId: string
  ) {
    super("msdyn_CreateResourceOptimizationRequest");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateResourceOptimizationRequest`;

    const body: Record<string, unknown> = {
      ResourceIds: this.resourceIds,
      StartDate: this.startDate,
      EndDate: this.endDate,
      GoalId: this.goalId,
      IsSimulation: this.isSimulation,
      OptimizationRequestId: this.optimizationRequestId,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_CreateResourceOptimizationRequestResponse> {
    // No return value (204 No Content)
    return new msdyn_CreateResourceOptimizationRequestResponse();
  }
}

/**
 * msdyn_CreateResourceOptimizationRequest response message
 */
export class msdyn_CreateResourceOptimizationRequestResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CreateResourceOptimizationRequest");
  }

  static fromResponse(_data: unknown): msdyn_CreateResourceOptimizationRequestResponse {
    return new msdyn_CreateResourceOptimizationRequestResponse();
  }
}
