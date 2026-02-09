import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdatePrivacyTerms action
 */
export interface msdyn_UpdatePrivacyTermsResponse {
  UpdatePrivacyTermsResult: boolean;
}

/**
 * msdyn_UpdatePrivacyTerms action
 *
 * Unbound action
 */
export class msdyn_UpdatePrivacyTermsAction implements Executable<msdyn_UpdatePrivacyTermsResponse> {
  constructor(
    public readonly streamSource: number,
    public readonly isAccepted: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdatePrivacyTerms`;

    const body: Record<string, unknown> = {
      StreamSource: this.streamSource,
      IsAccepted: this.isAccepted,
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

  async parseResponse(response: Response): Promise<msdyn_UpdatePrivacyTermsResponse> {
    const data = await response.json();
    return data as msdyn_UpdatePrivacyTermsResponse;
  }
}
