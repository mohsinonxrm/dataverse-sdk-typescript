import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_getIslandUrlResponse as msdyn_getIslandUrlResponseData } from "./types/index.js";

/**
 * msdyn_getIslandUrl request message
 *
 * Web API Action: msdyn_getIslandUrl
 */
export class msdyn_getIslandUrlRequest
  extends OrganizationRequest
  implements Executable<msdyn_getIslandUrlResponse>
{
  constructor() {
    super("msdyn_getIslandUrl");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_getIslandUrl`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_getIslandUrlResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_getIslandUrlResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_getIslandUrl response message
 */
export class msdyn_getIslandUrlResponse extends OrganizationResponse {
  constructor(public result: msdyn_getIslandUrlResponseData) {
    super("msdyn_getIslandUrl");
  }

  static fromResponse(data: unknown): msdyn_getIslandUrlResponse {
    return new msdyn_getIslandUrlResponse(responseObject<msdyn_getIslandUrlResponseData>(data));
  }
}
