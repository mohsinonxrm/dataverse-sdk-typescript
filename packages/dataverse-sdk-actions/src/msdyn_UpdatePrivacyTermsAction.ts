import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_UpdatePrivacyTerms action
 */
export interface msdyn_UpdatePrivacyTermsResponse {
  UpdatePrivacyTermsResult: boolean;
}

/**
 * Parameters of the msdyn_UpdatePrivacyTerms action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdatePrivacyTermsActionParameters {
  StreamSource: number;
  IsAccepted: boolean;
}

/**
 * msdyn_UpdatePrivacyTerms action
 *
 * Unbound action
 */
export class msdyn_UpdatePrivacyTermsAction implements Executable<msdyn_UpdatePrivacyTermsResponse> {
  constructor(public readonly parameters: msdyn_UpdatePrivacyTermsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdatePrivacyTerms`;

    const body = requestBody({
      StreamSource: this.parameters.StreamSource,
      IsAccepted: this.parameters.IsAccepted,
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

  async parseResponse(response: Response): Promise<msdyn_UpdatePrivacyTermsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_UpdatePrivacyTermsResponse;
    return (await response.json()) as msdyn_UpdatePrivacyTermsResponse;
  }
}
