import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetKeywordsResponse as msdyn_GetKeywordsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetKeywords message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetKeywordsRequestParameters {
  msdyn_entityType?: string;
  msdyn_activityId?: string;
  msdyn_queryLocale?: string;
  msdyn_userquery: string;
  msdyn_entityName?: string;
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
      msdyn_entityType: this.Parameters.msdyn_entityType,
      msdyn_activityId: this.Parameters.msdyn_activityId,
      msdyn_queryLocale: this.Parameters.msdyn_queryLocale,
      msdyn_userquery: this.Parameters.msdyn_userquery,
      msdyn_entityName: this.Parameters.msdyn_entityName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetKeywordsResponse.fromResponse({});
    return msdyn_GetKeywordsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetKeywords response message
 */
export class msdyn_GetKeywordsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetKeywordsResponseData) {
    super("msdyn_GetKeywords");
  }

  static fromResponse(data: unknown): msdyn_GetKeywordsResponse {
    return new msdyn_GetKeywordsResponse(responseObject<msdyn_GetKeywordsResponseData>(data));
  }
}
