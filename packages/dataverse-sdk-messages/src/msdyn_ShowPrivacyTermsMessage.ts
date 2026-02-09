import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_ShowPrivacyTerms request message
 *
 * Web API Action: msdyn_ShowPrivacyTerms
 */
export class msdyn_ShowPrivacyTermsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ShowPrivacyTermsResponse>
{
  constructor(public streamSource: number) {
    super("msdyn_ShowPrivacyTerms");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ShowPrivacyTerms`;

    const body: Record<string, unknown> = {
      StreamSource: this.streamSource,
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

  async parseResponse(response: Response): Promise<msdyn_ShowPrivacyTermsResponse> {
    const data = await response.json();
    return msdyn_ShowPrivacyTermsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      StreamSource: this.streamSource,
    };
  }
}

/**
 * msdyn_ShowPrivacyTerms response message
 */
export class msdyn_ShowPrivacyTermsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ShowPrivacyTermsResponse) {
    super("msdyn_ShowPrivacyTerms");
  }

  static fromResponse(data: unknown): msdyn_ShowPrivacyTermsResponse {
    return new msdyn_ShowPrivacyTermsResponse((data as any).value);
  }
}
