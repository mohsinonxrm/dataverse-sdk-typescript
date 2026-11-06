import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetFeatureConsentStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetFeatureConsentStatusRequestParameters {
  payload: string;
}

/**
 * msdyn_GetFeatureConsentStatus request message
 *
 * Web API Action: msdyn_GetFeatureConsentStatus
 */
export class msdyn_GetFeatureConsentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFeatureConsentStatusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetFeatureConsentStatusRequestParameters>;

  constructor(parameters: msdyn_GetFeatureConsentStatusRequestParameters) {
    super("msdyn_GetFeatureConsentStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureConsentStatus`;

    const body = requestBody({
      payload: this.Parameters.payload,
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

  async parseResponse(response: Response): Promise<msdyn_GetFeatureConsentStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_GetFeatureConsentStatusResponse();
  }
}

/**
 * msdyn_GetFeatureConsentStatus response message
 */
export class msdyn_GetFeatureConsentStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_GetFeatureConsentStatus");
  }

  static fromResponse(_data: unknown): msdyn_GetFeatureConsentStatusResponse {
    return new msdyn_GetFeatureConsentStatusResponse();
  }
}
