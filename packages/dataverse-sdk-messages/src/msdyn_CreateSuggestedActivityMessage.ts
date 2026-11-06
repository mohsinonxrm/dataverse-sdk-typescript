import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_CreateSuggestedActivityResponse as msdyn_CreateSuggestedActivityResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateSuggestedActivity message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateSuggestedActivityRequestParameters {
  SuggestedActivityId: string;
  RegardingObjectId: string;
  RegardingObjectEntity: string;
  IsAdminConsented?: boolean;
}

/**
 * msdyn_CreateSuggestedActivity request message
 *
 * Web API Action: msdyn_CreateSuggestedActivity
 */
export class msdyn_CreateSuggestedActivityRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateSuggestedActivityResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateSuggestedActivityRequestParameters>;

  constructor(parameters: msdyn_CreateSuggestedActivityRequestParameters) {
    super("msdyn_CreateSuggestedActivity", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateSuggestedActivity`;

    const body = requestBody({
      SuggestedActivityId: this.Parameters.SuggestedActivityId,
      RegardingObjectId: this.Parameters.RegardingObjectId,
      RegardingObjectEntity: this.Parameters.RegardingObjectEntity,
      IsAdminConsented: this.Parameters.IsAdminConsented,
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

  async parseResponse(response: Response): Promise<msdyn_CreateSuggestedActivityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CreateSuggestedActivityResponse.fromResponse({});
    return msdyn_CreateSuggestedActivityResponse.fromResponse(await response.json());
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
