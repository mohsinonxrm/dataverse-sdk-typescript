import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetFeatureConsentStatus request message
 *
 * Web API Action: msdyn_GetFeatureConsentStatus
 */
export class msdyn_GetFeatureConsentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetFeatureConsentStatusResponse>
{
  constructor(public payload: string) {
    super("msdyn_GetFeatureConsentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetFeatureConsentStatus`;

    const body: Record<string, unknown> = {
      payload: this.payload,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetFeatureConsentStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_GetFeatureConsentStatusResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      payload: this.payload,
    };
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
