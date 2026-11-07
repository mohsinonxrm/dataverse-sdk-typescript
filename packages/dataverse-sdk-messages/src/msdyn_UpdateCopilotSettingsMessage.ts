import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateCopilotSettings message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateCopilotSettingsRequestParameters {
  msdyn_input: string;
}

/**
 * msdyn_UpdateCopilotSettings request message
 *
 * Web API Action: msdyn_UpdateCopilotSettings
 */
export class msdyn_UpdateCopilotSettingsRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateCopilotSettingsResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateCopilotSettingsRequestParameters>;

  constructor(parameters: msdyn_UpdateCopilotSettingsRequestParameters) {
    super("msdyn_UpdateCopilotSettings", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateCopilotSettings`;

    const body = requestBody({
      msdyn_input: this.Parameters.msdyn_input,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateCopilotSettingsResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateCopilotSettingsResponse());
  }
}

/**
 * msdyn_UpdateCopilotSettings response message
 */
export class msdyn_UpdateCopilotSettingsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateCopilotSettings");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateCopilotSettingsResponse {
    return new msdyn_UpdateCopilotSettingsResponse();
  }
}
