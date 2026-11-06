import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_EnableSharePointResponse as msdyn_EnableSharePointResponseData } from "./types/index.js";

/**
 * msdyn_EnableSharePoint request message
 *
 * Web API Action: msdyn_EnableSharePoint
 */
export class msdyn_EnableSharePointRequest
  extends OrganizationRequest
  implements Executable<msdyn_EnableSharePointResponse>
{
  constructor() {
    super("msdyn_EnableSharePoint");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableSharePoint`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableSharePointResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_EnableSharePointResponse.fromResponse({});
    return msdyn_EnableSharePointResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_EnableSharePoint response message
 */
export class msdyn_EnableSharePointResponse extends OrganizationResponse {
  constructor(public result: msdyn_EnableSharePointResponseData) {
    super("msdyn_EnableSharePoint");
  }

  static fromResponse(data: unknown): msdyn_EnableSharePointResponse {
    return new msdyn_EnableSharePointResponse(
      responseObject<msdyn_EnableSharePointResponseData>(data)
    );
  }
}
