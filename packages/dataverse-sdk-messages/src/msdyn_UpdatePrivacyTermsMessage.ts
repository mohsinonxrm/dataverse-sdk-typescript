import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_UpdatePrivacyTermsResponse as msdyn_UpdatePrivacyTermsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_UpdatePrivacyTerms message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdatePrivacyTermsRequestParameters {
  StreamSource: number;
  IsAccepted: boolean;
}

/**
 * msdyn_UpdatePrivacyTerms request message
 *
 * Web API Action: msdyn_UpdatePrivacyTerms
 */
export class msdyn_UpdatePrivacyTermsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdatePrivacyTermsResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdatePrivacyTermsRequestParameters>;

  constructor(parameters: msdyn_UpdatePrivacyTermsRequestParameters) {
    super("msdyn_UpdatePrivacyTerms", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdatePrivacyTerms`;

    const body = requestBody({
      StreamSource: this.Parameters.StreamSource,
      IsAccepted: this.Parameters.IsAccepted,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_UpdatePrivacyTermsResponse.fromResponse(text ? JSON.parse(text) : {});
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
