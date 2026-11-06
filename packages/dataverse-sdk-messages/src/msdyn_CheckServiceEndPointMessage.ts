import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckServiceEndPointResponse as msdyn_CheckServiceEndPointResponseData } from "./types/index.js";

/**
 * msdyn_CheckServiceEndPoint request message
 *
 * Web API Action: msdyn_CheckServiceEndPoint
 */
export class msdyn_CheckServiceEndPointRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckServiceEndPointResponse>
{
  constructor() {
    super("msdyn_CheckServiceEndPoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckServiceEndPoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckServiceEndPointResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckServiceEndPointResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckServiceEndPoint response message
 */
export class msdyn_CheckServiceEndPointResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckServiceEndPointResponseData) {
    super("msdyn_CheckServiceEndPoint");
  }

  static fromResponse(data: unknown): msdyn_CheckServiceEndPointResponse {
    return new msdyn_CheckServiceEndPointResponse(
      responseObject<msdyn_CheckServiceEndPointResponseData>(data)
    );
  }
}
