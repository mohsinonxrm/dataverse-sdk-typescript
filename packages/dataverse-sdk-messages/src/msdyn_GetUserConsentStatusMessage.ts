import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetUserConsentStatus request message
 *
 * Web API Action: msdyn_GetUserConsentStatus
 */
export class msdyn_GetUserConsentStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetUserConsentStatusResponse>
{
  constructor() {
    super("msdyn_GetUserConsentStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetUserConsentStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetUserConsentStatusResponse> {
    const data = await response.json();
    return msdyn_GetUserConsentStatusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_GetUserConsentStatus response message
 */
export class msdyn_GetUserConsentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetUserConsentStatusResponse) {
    super("msdyn_GetUserConsentStatus");
  }

  static fromResponse(data: unknown): msdyn_GetUserConsentStatusResponse {
    return new msdyn_GetUserConsentStatusResponse((data as any).value);
  }
}
