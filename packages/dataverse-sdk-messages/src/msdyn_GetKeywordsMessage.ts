import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetKeywordsResponse as msdyn_GetKeywordsResponseData } from "./types/index.js";

/**
 * msdyn_GetKeywords request message
 *
 * Web API Action: msdyn_GetKeywords
 */
export class msdyn_GetKeywordsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetKeywordsResponse>
{
  constructor(
    public msdyn_entityType: string,
    public msdyn_activityId: string,
    public msdyn_queryLocale: string,
    public msdyn_userquery: string,
    public msdyn_entityName: string
  ) {
    super("msdyn_GetKeywords");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetKeywords`;

    const body: Record<string, unknown> = {
      msdyn_entityType: this.msdyn_entityType,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_queryLocale: this.msdyn_queryLocale,
      msdyn_userquery: this.msdyn_userquery,
      msdyn_entityName: this.msdyn_entityName,
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

  async parseResponse(response: Response): Promise<msdyn_GetKeywordsResponse> {
    const data = await response.json();
    return msdyn_GetKeywordsResponse.fromResponse(data);
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
