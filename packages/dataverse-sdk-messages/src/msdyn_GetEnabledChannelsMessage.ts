import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetEnabledChannelsResponse as msdyn_GetEnabledChannelsResponseData } from "./types/index.js";

/**
 * msdyn_GetEnabledChannels request message
 *
 * Web API Action: msdyn_GetEnabledChannels
 */
export class msdyn_GetEnabledChannelsRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetEnabledChannelsResponse>
{
  constructor() {
    super("msdyn_GetEnabledChannels");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetEnabledChannels`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetEnabledChannelsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetEnabledChannelsResponse.fromResponse({});
    return msdyn_GetEnabledChannelsResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetEnabledChannels response message
 */
export class msdyn_GetEnabledChannelsResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetEnabledChannelsResponseData) {
    super("msdyn_GetEnabledChannels");
  }

  static fromResponse(data: unknown): msdyn_GetEnabledChannelsResponse {
    return new msdyn_GetEnabledChannelsResponse(
      responseObject<msdyn_GetEnabledChannelsResponseData>(data)
    );
  }
}
