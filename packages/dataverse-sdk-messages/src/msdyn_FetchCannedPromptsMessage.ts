import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_FetchCannedPromptsResponse as msdyn_FetchCannedPromptsResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_FetchCannedPrompts message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchCannedPromptsRequestParameters {
  scenarioid: string;
  scenariotype: string;
}

/**
 * msdyn_FetchCannedPrompts request message
 *
 * Web API Action: msdyn_FetchCannedPrompts
 */
export class msdyn_FetchCannedPromptsRequest
  extends OrganizationRequest
  implements Executable<msdyn_FetchCannedPromptsResponse>
{
  declare readonly Parameters: Readonly<msdyn_FetchCannedPromptsRequestParameters>;

  constructor(parameters: msdyn_FetchCannedPromptsRequestParameters) {
    super("msdyn_FetchCannedPrompts", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchCannedPrompts`;

    const body = requestBody({
      scenarioid: this.Parameters.scenarioid,
      scenariotype: this.Parameters.scenariotype,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_FetchCannedPromptsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_FetchCannedPromptsResponse.fromResponse({});
    return msdyn_FetchCannedPromptsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_FetchCannedPrompts response message
 */
export class msdyn_FetchCannedPromptsResponse extends OrganizationResponse {
  constructor(public result: msdyn_FetchCannedPromptsResponseData) {
    super("msdyn_FetchCannedPrompts");
  }

  static fromResponse(data: unknown): msdyn_FetchCannedPromptsResponse {
    return new msdyn_FetchCannedPromptsResponse(
      responseObject<msdyn_FetchCannedPromptsResponseData>(data)
    );
  }
}
