import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CreateSuggestedActivityResponse as msdyn_CreateSuggestedActivityResponseData } from "./types/index.js";

/**
 * msdyn_CreateSuggestedActivity request message
 *
 * Web API Action: msdyn_CreateSuggestedActivity
 */
export class msdyn_CreateSuggestedActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSuggestedActivityResponse>
{
  constructor(
    public suggestedActivityId: string,
    public regardingObjectId: string,
    public regardingObjectEntity: string,
    public isAdminConsented: boolean
  ) {
    super("msdyn_CreateSuggestedActivity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedActivity`;

    const body: Record<string, unknown> = {
      SuggestedActivityId: this.suggestedActivityId,
      RegardingObjectId: this.regardingObjectId,
      RegardingObjectEntity: this.regardingObjectEntity,
      IsAdminConsented: this.isAdminConsented,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedActivityResponse> {
    const data = await response.json();
    return msdyn_CreateSuggestedActivityResponse.fromResponse(data);
  }
}

/**
 * msdyn_CreateSuggestedActivity response message
 */
export class msdyn_CreateSuggestedActivityResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateSuggestedActivityResponseData) {
    super("msdyn_CreateSuggestedActivity");
  }

  static fromResponse(data: unknown): msdyn_CreateSuggestedActivityResponse {
    return new msdyn_CreateSuggestedActivityResponse(
      responseObject<msdyn_CreateSuggestedActivityResponseData>(data)
    );
  }
}
