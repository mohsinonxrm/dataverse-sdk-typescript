import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_ShowPrivacyTermsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_ShowPrivacyTerms action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ShowPrivacyTermsResult {
  "@odata.context"?: string;
  ShowPrivacyTerms: boolean;
}

/**
 * msdyn_ShowPrivacyTerms response message
 *
 * `result` is the value the msdyn_ShowPrivacyTerms action returns (see {@link msdyn_ShowPrivacyTermsResult}).
 */
export class msdyn_ShowPrivacyTermsResponse extends OrganizationResponse {
  constructor(public result: msdyn_ShowPrivacyTermsResult) {
    super("msdyn_ShowPrivacyTerms");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_ShowPrivacyTermsResponse {
    return new msdyn_ShowPrivacyTermsResponse(data as msdyn_ShowPrivacyTermsResult);
  }
}
