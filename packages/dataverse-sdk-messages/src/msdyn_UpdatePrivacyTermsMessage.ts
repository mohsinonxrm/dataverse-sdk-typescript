import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_UpdatePrivacyTermsResponse as msdyn_UpdatePrivacyTermsResponseData } from "./types/index.js";

/**
 * msdyn_UpdatePrivacyTerms request message
 *
 * Web API Action: msdyn_UpdatePrivacyTerms
 */
export class msdyn_UpdatePrivacyTermsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdatePrivacyTermsResponse>
{
  constructor(
    public streamSource: number,
    public isAccepted: boolean
  ) {
    super("msdyn_UpdatePrivacyTerms");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_UpdatePrivacyTermsResponse> {
    const data = await response.json();
    return msdyn_UpdatePrivacyTermsResponse.fromResponse(data);
  }
}

/**
 * msdyn_UpdatePrivacyTerms response message
 */
export class msdyn_UpdatePrivacyTermsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdatePrivacyTermsResponseData) {
    super("msdyn_UpdatePrivacyTerms");
  }

  static fromResponse(data: unknown): msdyn_UpdatePrivacyTermsResponse {
    return new msdyn_UpdatePrivacyTermsResponse(
      responseObject<msdyn_UpdatePrivacyTermsResponseData>(data)
    );
  }
}
