import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_SetLegalAcceptanceStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetLegalAcceptanceStatusRequestParameters {
  Status: boolean;
}

/**
 * msdyn_SetLegalAcceptanceStatus request message
 *
 * Web API Action: msdyn_SetLegalAcceptanceStatus
 */
export class msdyn_SetLegalAcceptanceStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_SetLegalAcceptanceStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_SetLegalAcceptanceStatusRequestParameters>;

  constructor(parameters: msdyn_SetLegalAcceptanceStatusRequestParameters) {
    super("msdyn_SetLegalAcceptanceStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetLegalAcceptanceStatus`;

    const body = requestBody({
      Status: this.Parameters.Status,
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

  parseResponse(_response: Response): Promise<msdyn_SetLegalAcceptanceStatusResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_SetLegalAcceptanceStatusResponse());
  }
}

/**
 * msdyn_SetLegalAcceptanceStatus response message
 */
export class msdyn_SetLegalAcceptanceStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_SetLegalAcceptanceStatus");
  }

  static fromResponse(_data?: unknown): msdyn_SetLegalAcceptanceStatusResponse {
    return new msdyn_SetLegalAcceptanceStatusResponse();
  }
}
