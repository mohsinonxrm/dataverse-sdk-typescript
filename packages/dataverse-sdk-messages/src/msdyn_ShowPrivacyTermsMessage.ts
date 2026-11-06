import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_ShowPrivacyTermsResponse as msdyn_ShowPrivacyTermsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_ShowPrivacyTerms message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ShowPrivacyTermsRequestParameters {
  StreamSource: number;
}

/**
 * msdyn_ShowPrivacyTerms request message
 *
 * Web API Action: msdyn_ShowPrivacyTerms
 */
export class msdyn_ShowPrivacyTermsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ShowPrivacyTermsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ShowPrivacyTermsRequestParameters>;

  constructor(parameters: msdyn_ShowPrivacyTermsRequestParameters) {
    super("msdyn_ShowPrivacyTerms", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ShowPrivacyTerms`;

    const body = requestBody({
      StreamSource: this.Parameters.StreamSource,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_ShowPrivacyTermsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_ShowPrivacyTerms response message
 */
export class msdyn_ShowPrivacyTermsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ShowPrivacyTermsResponseData) {
    super("msdyn_ShowPrivacyTerms");
  }

  static fromResponse(data: unknown): msdyn_ShowPrivacyTermsResponse {
    return new msdyn_ShowPrivacyTermsResponse(
      responseObject<msdyn_ShowPrivacyTermsResponseData>(data)
    );
  }
}
