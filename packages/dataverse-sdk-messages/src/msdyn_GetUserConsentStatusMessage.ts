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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetUserConsentStatusResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetUserConsentStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetUserConsentStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetUserConsentStatusResult {
  "@odata.context"?: string;
  status: string;
}

/**
 * msdyn_GetUserConsentStatus response message
 *
 * `result` is the value the msdyn_GetUserConsentStatus action returns (see {@link msdyn_GetUserConsentStatusResult}).
 */
export class msdyn_GetUserConsentStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetUserConsentStatusResult) {
    super("msdyn_GetUserConsentStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetUserConsentStatusResponse {
    return new msdyn_GetUserConsentStatusResponse(data as msdyn_GetUserConsentStatusResult);
  }
}
