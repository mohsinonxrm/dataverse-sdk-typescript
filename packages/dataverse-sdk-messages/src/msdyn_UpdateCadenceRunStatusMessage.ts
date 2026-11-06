import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateCadenceRunStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateCadenceRunStatusRequestParameters {
  SalesCadenceInstanceId?: string;
  StatusType?: number;
  OverallStatus?: number;
  FlowRunStatus?: string;
}

/**
 * msdyn_UpdateCadenceRunStatus request message
 *
 * Web API Action: msdyn_UpdateCadenceRunStatus
 */
export class msdyn_UpdateCadenceRunStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateCadenceRunStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateCadenceRunStatusRequestParameters>;

  constructor(parameters: msdyn_UpdateCadenceRunStatusRequestParameters = {}) {
    super("msdyn_UpdateCadenceRunStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCadenceRunStatus`;

    const body = requestBody({
      SalesCadenceInstanceId: this.Parameters.SalesCadenceInstanceId,
      StatusType: this.Parameters.StatusType,
      OverallStatus: this.Parameters.OverallStatus,
      FlowRunStatus: this.Parameters.FlowRunStatus,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateCadenceRunStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateCadenceRunStatusResponse();
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
