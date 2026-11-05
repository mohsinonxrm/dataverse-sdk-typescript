import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_GetCopilotSettingsData request message
 *
 * Web API Action: msdyn_GetCopilotSettingsData
 */
export class msdyn_GetCopilotSettingsDataRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetCopilotSettingsDataResponse>
{
  constructor(public msdyn_input: string) {
    super("msdyn_GetCopilotSettingsData");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotSettingsData`;

    const body: Record<string, unknown> = {
      msdyn_input: this.msdyn_input,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetCopilotSettingsDataResponse> {
    const data = await response.json();
    return msdyn_GetCopilotSettingsDataResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      msdyn_input: this.msdyn_input,
    };
  }
}

/**
 * msdyn_GetCopilotSettingsData response message
 */
export class msdyn_GetCopilotSettingsDataResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetCopilotSettingsDataResponse) {
    super("msdyn_GetCopilotSettingsData");
  }

  static fromResponse(data: unknown): msdyn_GetCopilotSettingsDataResponse {
    return new msdyn_GetCopilotSettingsDataResponse((data as any).value);
  }
}
