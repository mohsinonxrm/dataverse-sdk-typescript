import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_PostOperationRevokeUsrConsent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_PostOperationRevokeUsrConsentResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_PostOperationRevokeUsrConsentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
