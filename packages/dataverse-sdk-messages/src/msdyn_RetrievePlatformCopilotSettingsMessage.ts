import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RetrievePlatformCopilotSettingsResponse> {
    const data = await response.json();
    return msdyn_RetrievePlatformCopilotSettingsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_RetrievePlatformCopilotSettings response message
 */
export class msdyn_RetrievePlatformCopilotSettingsResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrievePlatformCopilotSettingsResponse) {
    super("msdyn_RetrievePlatformCopilotSettings");
  }

  static fromResponse(data: unknown): msdyn_RetrievePlatformCopilotSettingsResponse {
    return new msdyn_RetrievePlatformCopilotSettingsResponse((data as any).value);
  }
}
