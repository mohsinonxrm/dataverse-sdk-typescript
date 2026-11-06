import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForWorkOrderTypesResponse as msdyn_CheckForWorkOrderTypesResponseData } from "./types/index.js";

/**
 * msdyn_CheckForWorkOrderTypes request message
 *
 * Web API Action: msdyn_CheckForWorkOrderTypes
 */
export class msdyn_CheckForWorkOrderTypesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForWorkOrderTypesResponse>
{
  constructor() {
    super("msdyn_CheckForWorkOrderTypes");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForWorkOrderTypes`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForWorkOrderTypesResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForWorkOrderTypesResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckForWorkOrderTypes response message
 */
export class msdyn_CheckForWorkOrderTypesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForWorkOrderTypesResponseData) {
    super("msdyn_CheckForWorkOrderTypes");
  }

  static fromResponse(data: unknown): msdyn_CheckForWorkOrderTypesResponse {
    return new msdyn_CheckForWorkOrderTypesResponse(
      responseObject<msdyn_CheckForWorkOrderTypesResponseData>(data)
    );
  }
}
