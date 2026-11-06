import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IsSharePointEnabledResponse as msdyn_IsSharePointEnabledResponseData } from "./types/index.js";

/**
 * msdyn_IsSharePointEnabled request message
 *
 * Web API Action: msdyn_IsSharePointEnabled
 */
export class msdyn_IsSharePointEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsSharePointEnabledResponse>
{
  constructor() {
    super("msdyn_IsSharePointEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSharePointEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSharePointEnabledResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_IsSharePointEnabledResponse.fromResponse({});
    return msdyn_IsSharePointEnabledResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_IsSharePointEnabled response message
 */
export class msdyn_IsSharePointEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsSharePointEnabledResponseData) {
    super("msdyn_IsSharePointEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsSharePointEnabledResponse {
    return new msdyn_IsSharePointEnabledResponse(
      responseObject<msdyn_IsSharePointEnabledResponseData>(data)
    );
  }
}
