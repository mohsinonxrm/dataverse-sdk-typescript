import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_RetrievePlatformCopilotSettingsResponse as msdyn_RetrievePlatformCopilotSettingsResponseData } from "./types/index.js";

/**
 * msdyn_RetrievePlatformCopilotSettings request message
 *
 * Web API Action: msdyn_RetrievePlatformCopilotSettings
 */
export class msdyn_RetrievePlatformCopilotSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrievePlatformCopilotSettingsResponse>
{
  constructor() {
    super("msdyn_RetrievePlatformCopilotSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrievePlatformCopilotSettings`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrievePlatformCopilotSettingsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdyn_RetrievePlatformCopilotSettingsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdyn_RetrievePlatformCopilotSettings response message
 */
export class msdyn_RetrievePlatformCopilotSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrievePlatformCopilotSettingsResponseData) {
    super("msdyn_RetrievePlatformCopilotSettings");
  }

  static fromResponse(data: unknown): msdyn_RetrievePlatformCopilotSettingsResponse {
    return new msdyn_RetrievePlatformCopilotSettingsResponse(
      responseObject<msdyn_RetrievePlatformCopilotSettingsResponseData>(data)
    );
  }
}
