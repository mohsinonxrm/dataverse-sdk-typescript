import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_PostOperationRevokeUsrConsent request message
 *
 * Web API Action: msdyn_PostOperationRevokeUsrConsent
 */
export class msdyn_PostOperationRevokeUsrConsentRequest
  extends OrganizationRequest
  implements Executable<msdyn_PostOperationRevokeUsrConsentResponse>
{
  constructor() {
    super("msdyn_PostOperationRevokeUsrConsent");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostOperationRevokeUsrConsent`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_PostOperationRevokeUsrConsentResponse> {
    // No return value (204 No Content)
    return new msdyn_PostOperationRevokeUsrConsentResponse();
  }
}

/**
 * msdyn_PostOperationRevokeUsrConsent response message
 */
export class msdyn_PostOperationRevokeUsrConsentResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_PostOperationRevokeUsrConsent");
  }

  static fromResponse(_data: unknown): msdyn_PostOperationRevokeUsrConsentResponse {
    return new msdyn_PostOperationRevokeUsrConsentResponse();
  }
}
