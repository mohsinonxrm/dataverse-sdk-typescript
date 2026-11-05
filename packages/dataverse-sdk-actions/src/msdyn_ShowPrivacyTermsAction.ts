import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ShowPrivacyTerms action
 */
export interface msdyn_ShowPrivacyTermsResponse {
  ShowPrivacyTerms: boolean;
}

/**
 * msdyn_ShowPrivacyTerms action
 *
 * Unbound action
 */
export class msdyn_ShowPrivacyTermsAction implements Executable<msdyn_ShowPrivacyTermsResponse> {
  constructor(public readonly streamSource: number) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ShowPrivacyTerms`;

    const body: Record<string, unknown> = {
      StreamSource: this.streamSource,
    };

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
    const data = await response.json();
    return data as msdyn_ShowPrivacyTermsResponse;
  }
}
