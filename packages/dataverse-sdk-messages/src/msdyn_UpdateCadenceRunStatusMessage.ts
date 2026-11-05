import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateCadenceRunStatus request message
 *
 * Web API Action: msdyn_UpdateCadenceRunStatus
 */
export class msdyn_UpdateCadenceRunStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateCadenceRunStatusResponse>
{
  constructor(
    public salesCadenceInstanceId: string,
    public statusType: number,
    public overallStatus: number,
    public flowRunStatus: string
  ) {
    super("msdyn_UpdateCadenceRunStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCadenceRunStatus`;

    const body: Record<string, unknown> = {
      SalesCadenceInstanceId: this.salesCadenceInstanceId,
      StatusType: this.statusType,
      OverallStatus: this.overallStatus,
      FlowRunStatus: this.flowRunStatus,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateCadenceRunStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateCadenceRunStatusResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SalesCadenceInstanceId: this.salesCadenceInstanceId,
      StatusType: this.statusType,
      OverallStatus: this.overallStatus,
      FlowRunStatus: this.flowRunStatus,
    };
  }
}

/**
 * msdyn_UpdateCadenceRunStatus response message
 */
export class msdyn_UpdateCadenceRunStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateCadenceRunStatus");
  }

  static fromResponse(_data: unknown): msdyn_UpdateCadenceRunStatusResponse {
    return new msdyn_UpdateCadenceRunStatusResponse();
  }
}
