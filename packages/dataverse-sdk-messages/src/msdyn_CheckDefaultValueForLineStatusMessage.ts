import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckDefaultValueForLineStatusResponse as msdyn_CheckDefaultValueForLineStatusResponseData } from "./types/index.js";

/**
 * msdyn_CheckDefaultValueForLineStatus request message
 *
 * Web API Action: msdyn_CheckDefaultValueForLineStatus
 */
export class msdyn_CheckDefaultValueForLineStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckDefaultValueForLineStatusResponse>
{
  constructor() {
    super("msdyn_CheckDefaultValueForLineStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckDefaultValueForLineStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckDefaultValueForLineStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_CheckDefaultValueForLineStatusResponse.fromResponse({});
    return msdyn_CheckDefaultValueForLineStatusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_CheckDefaultValueForLineStatus response message
 */
export class msdyn_CheckDefaultValueForLineStatusResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckDefaultValueForLineStatusResponseData) {
    super("msdyn_CheckDefaultValueForLineStatus");
  }

  static fromResponse(data: unknown): msdyn_CheckDefaultValueForLineStatusResponse {
    return new msdyn_CheckDefaultValueForLineStatusResponse(
      responseObject<msdyn_CheckDefaultValueForLineStatusResponseData>(data)
    );
  }
}
