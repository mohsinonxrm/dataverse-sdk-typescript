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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_PostOperationRevokeUsrConsentResponse;
  }
}
