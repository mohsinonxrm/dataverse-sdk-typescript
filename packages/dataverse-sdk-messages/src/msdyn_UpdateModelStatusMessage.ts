import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateModelStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateModelStatusRequestParameters {
  AIConfig: string;
}

/**
 * msdyn_UpdateModelStatus request message
 *
 * Web API Action: msdyn_UpdateModelStatus
 *
 * The first argument is the id of the msdyn_ocsimltraining record to call it on.
 */
export class msdyn_UpdateModelStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateModelStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateModelStatusRequestParameters>;

  constructor(
    public msdyn_ocsimltrainingId: string,
    parameters: msdyn_UpdateModelStatusRequestParameters
  ) {
    super("msdyn_UpdateModelStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_ocsimltrainings(${this.msdyn_ocsimltrainingId})/Microsoft.Dynamics.CRM.msdyn_UpdateModelStatus`;

    const body = requestBody({
      AIConfig: this.Parameters.AIConfig,
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
