import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ShowPrivacyTerms action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ShowPrivacyTermsResponse {
  "@odata.context"?: string;
  ShowPrivacyTerms: boolean;
}

/**
 * Parameters of the msdyn_ShowPrivacyTerms action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ShowPrivacyTermsActionParameters {
  StreamSource: number;
}

/**
 * msdyn_ShowPrivacyTerms action
 *
 * Unbound action
 */
export class msdyn_ShowPrivacyTermsAction implements Executable<msdyn_ShowPrivacyTermsResponse> {
  constructor(public readonly parameters: msdyn_ShowPrivacyTermsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ShowPrivacyTerms`;

    const body = requestBody({
      StreamSource: this.parameters.StreamSource,
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

  async parseResponse(response: Response): Promise<msdyn_ShowPrivacyTermsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ShowPrivacyTermsResponse;
  }
}
