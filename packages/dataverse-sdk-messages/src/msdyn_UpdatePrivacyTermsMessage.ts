import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_UpdatePrivacyTermsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_UpdatePrivacyTerms action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_UpdatePrivacyTermsResult {
  "@odata.context"?: string;
  UpdatePrivacyTermsResult: boolean;
}

/**
 * msdyn_UpdatePrivacyTerms response message
 *
 * `result` is the value the msdyn_UpdatePrivacyTerms action returns (see {@link msdyn_UpdatePrivacyTermsResult}).
 */
export class msdyn_UpdatePrivacyTermsResponse extends OrganizationResponse {
  constructor(public result: msdyn_UpdatePrivacyTermsResult) {
    super("msdyn_UpdatePrivacyTerms");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_UpdatePrivacyTermsResponse {
    return new msdyn_UpdatePrivacyTermsResponse(data as msdyn_UpdatePrivacyTermsResult);
  }
}
