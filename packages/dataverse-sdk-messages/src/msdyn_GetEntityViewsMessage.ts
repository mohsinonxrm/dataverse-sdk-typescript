import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetEntityViewsResponse as msdyn_GetEntityViewsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_GetEntityViews message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetEntityViewsRequestParameters {
  msdyn_input: string;
}

/**
 * msdyn_GetEntityViews request message
 *
 * Web API Action: msdyn_GetEntityViews
 */
export class msdyn_GetEntityViewsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityViewsResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetEntityViewsRequestParameters>;

  constructor(parameters: msdyn_GetEntityViewsRequestParameters) {
    super("msdyn_GetEntityViews", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityViews`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityViewsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetEntityViewsResponse.fromResponse({});
    return msdyn_GetEntityViewsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetEntityViews response message
 */
export class msdyn_GetEntityViewsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEntityViewsResponseData) {
    super("msdyn_GetEntityViews");
  }

  static fromResponse(data: unknown): msdyn_GetEntityViewsResponse {
    return new msdyn_GetEntityViewsResponse(responseObject<msdyn_GetEntityViewsResponseData>(data));
  }
}
