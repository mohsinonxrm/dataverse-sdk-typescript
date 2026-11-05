import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetEntityViewsResponse as msdyn_GetEntityViewsResponseData } from "./types/index.js";

/**
 * msdyn_GetEntityViews request message
 *
 * Web API Action: msdyn_GetEntityViews
 */
export class msdyn_GetEntityViewsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEntityViewsResponse>
{
  constructor(public msdyn_input: string) {
    super("msdyn_GetEntityViews");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEntityViews`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
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

  async parseResponse(response: Response): Promise<msdyn_GetEntityViewsResponse> {
    const data = await response.json();
    return msdyn_GetEntityViewsResponse.fromResponse(data);
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
