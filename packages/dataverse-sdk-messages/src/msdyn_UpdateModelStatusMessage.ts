import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateModelStatus request message
 *
 * Web API Action: msdyn_UpdateModelStatus
 */
export class msdyn_UpdateModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateModelStatusResponse>
{
  constructor(
    public msdyn_ocsimltrainingId: string,
    public aIConfig: string
  ) {
    super("msdyn_UpdateModelStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsimltrainings(${this.msdyn_ocsimltrainingId})/Microsoft.Dynamics.CRM.msdyn_UpdateModelStatus`;

    const body: Record<string, unknown> = {
      AIConfig: this.aIConfig,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateModelStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateModelStatusResponse();
  }
}

/**
 * msdyn_UpdateModelStatus response message
 */
export class msdyn_UpdateModelStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateModelStatus");
  }

  static fromResponse(_data: unknown): msdyn_UpdateModelStatusResponse {
    return new msdyn_UpdateModelStatusResponse();
  }
}
