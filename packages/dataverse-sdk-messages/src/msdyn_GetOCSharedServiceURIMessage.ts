import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetOCSharedServiceURIResponse as msdyn_GetOCSharedServiceURIResponseData } from "./types/index.js";

/**
 * msdyn_GetOCSharedServiceURI request message
 *
 * Web API Action: msdyn_GetOCSharedServiceURI
 */
export class msdyn_GetOCSharedServiceURIRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOCSharedServiceURIResponse>
{
  constructor() {
    super("msdyn_GetOCSharedServiceURI");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOCSharedServiceURI`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetOCSharedServiceURIResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_GetOCSharedServiceURIResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_GetOCSharedServiceURI response message
 */
export class msdyn_GetOCSharedServiceURIResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOCSharedServiceURIResponseData) {
    super("msdyn_GetOCSharedServiceURI");
  }

  static fromResponse(data: unknown): msdyn_GetOCSharedServiceURIResponse {
    return new msdyn_GetOCSharedServiceURIResponse(
      responseObject<msdyn_GetOCSharedServiceURIResponseData>(data)
    );
  }
}
