import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateAuditState message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateAuditStateRequestParameters {
  msdyn_input: string;
}

/**
 * msdyn_UpdateAuditState request message
 *
 * Web API Action: msdyn_UpdateAuditState
 */
export class msdyn_UpdateAuditStateRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateAuditStateResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateAuditStateRequestParameters>;

  constructor(parameters: msdyn_UpdateAuditStateRequestParameters) {
    super("msdyn_UpdateAuditState", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateAuditState`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateAuditStateResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateAuditStateResponse());
  }
}

/**
 * msdyn_UpdateAuditState response message
 */
export class msdyn_UpdateAuditStateResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateAuditState");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateAuditStateResponse {
    return new msdyn_UpdateAuditStateResponse();
  }
}
