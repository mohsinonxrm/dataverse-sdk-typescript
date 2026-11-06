import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_CheckForSolutionVersionResponse as msdyn_CheckForSolutionVersionResponseData } from "./types/index.js";

/**
 * msdyn_CheckForSolutionVersion request message
 *
 * Web API Action: msdyn_CheckForSolutionVersion
 */
export class msdyn_CheckForSolutionVersionRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckForSolutionVersionResponse>
{
  constructor() {
    super("msdyn_CheckForSolutionVersion");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckForSolutionVersion`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckForSolutionVersionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_CheckForSolutionVersionResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_CheckForSolutionVersion response message
 */
export class msdyn_CheckForSolutionVersionResponse extends OrganizationResponse {
  constructor(public result: msdyn_CheckForSolutionVersionResponseData) {
    super("msdyn_CheckForSolutionVersion");
  }

  static fromResponse(data: unknown): msdyn_CheckForSolutionVersionResponse {
    return new msdyn_CheckForSolutionVersionResponse(
      responseObject<msdyn_CheckForSolutionVersionResponseData>(data)
    );
  }
}
