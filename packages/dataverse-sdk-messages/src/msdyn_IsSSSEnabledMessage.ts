import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_IsSSSEnabledResponse as msdyn_IsSSSEnabledResponseData } from "./types/index.js";

/**
 * msdyn_IsSSSEnabled request message
 *
 * Web API Action: msdyn_IsSSSEnabled
 */
export class msdyn_IsSSSEnabledRequest
  extends OrganizationRequest
  implements Executable<msdyn_IsSSSEnabledResponse>
{
  constructor() {
    super("msdyn_IsSSSEnabled");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IsSSSEnabled`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsSSSEnabledResponse> {
    const data = await response.json();
    return msdyn_IsSSSEnabledResponse.fromResponse(data);
  }
}

/**
 * msdyn_IsSSSEnabled response message
 */
export class msdyn_IsSSSEnabledResponse extends OrganizationResponse {
  constructor(public result: msdyn_IsSSSEnabledResponseData) {
    super("msdyn_IsSSSEnabled");
  }

  static fromResponse(data: unknown): msdyn_IsSSSEnabledResponse {
    return new msdyn_IsSSSEnabledResponse(responseObject<msdyn_IsSSSEnabledResponseData>(data));
  }
}
