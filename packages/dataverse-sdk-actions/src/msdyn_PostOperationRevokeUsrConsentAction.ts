import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_PostOperationRevokeUsrConsent action
 */
export interface msdyn_PostOperationRevokeUsrConsentResponse {
  // No content returned
}

/**
 * msdyn_PostOperationRevokeUsrConsent action
 *
 * Unbound action
 */
export class msdyn_PostOperationRevokeUsrConsentAction implements Executable<msdyn_PostOperationRevokeUsrConsentResponse> {
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
    return {};
  }
}
