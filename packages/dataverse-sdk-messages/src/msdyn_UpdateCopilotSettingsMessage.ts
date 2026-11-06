import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateCopilotSettings request message
 *
 * Web API Action: msdyn_UpdateCopilotSettings
 */
export class msdyn_UpdateCopilotSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateCopilotSettingsResponse>
{
  constructor(public msdyn_input: string) {
    super("msdyn_UpdateCopilotSettings");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCopilotSettings`;

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

  async parseResponse(response: Response): Promise<msdyn_UpdateCopilotSettingsResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateCopilotSettingsResponse();
  }
}

/**
 * msdyn_UpdateCopilotSettings response message
 */
export class msdyn_UpdateCopilotSettingsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateCopilotSettings");
  }

  static fromResponse(_data: unknown): msdyn_UpdateCopilotSettingsResponse {
    return new msdyn_UpdateCopilotSettingsResponse();
  }
}
