import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetKeywords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeywordsRequestParameters {
  msdyn_activityId?: string;
  msdyn_entityType?: string;
  msdyn_queryLocale?: string;
  msdyn_entityName?: string;
  msdyn_userquery: string;
}

/**
 * msdyn_GetKeywords request message
 *
 * Web API Action: msdyn_GetKeywords
 */
export class msdyn_GetKeywordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKeywordsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetKeywordsRequestParameters>;

  constructor(parameters: msdyn_GetKeywordsRequestParameters) {
    super("msdyn_GetKeywords", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeywords`;

    const body = requestBody({
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_entityType: this.Parameters.msdyn_entityType,
      msdyn_queryLocale: this.Parameters.msdyn_queryLocale,
      msdyn_entityName: this.Parameters.msdyn_entityName,
      msdyn_userquery: this.Parameters.msdyn_userquery,
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

  async parseResponse(response: Response): Promise<msdyn_GetKeywordsResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_GetKeywordsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetKeywords action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetKeywordsResult {
  "@odata.context"?: string;
  msdyn_response: string;
}

/**
 * msdyn_GetKeywords response message
 *
 * `result` is the value the msdyn_GetKeywords action returns (see {@link msdyn_GetKeywordsResult}).
 */
export class msdyn_GetKeywordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKeywordsResult) {
    super("msdyn_GetKeywords");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetKeywordsResponse {
    return new msdyn_GetKeywordsResponse(data as msdyn_GetKeywordsResult);
  }
}
