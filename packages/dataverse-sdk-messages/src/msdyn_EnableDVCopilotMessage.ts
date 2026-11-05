import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_EnableDVCopilot request message
 *
 * Web API Action: msdyn_EnableDVCopilot
 */
export class msdyn_EnableDVCopilotRequest
  extends OrganizationRequest
  implements Executable<msdyn_EnableDVCopilotResponse>
{
  constructor() {
    super("msdyn_EnableDVCopilot");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EnableDVCopilot`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_EnableDVCopilotResponse> {
    // No return value (204 No Content)
    return new msdyn_EnableDVCopilotResponse();
  }
}

/**
 * msdyn_EnableDVCopilot response message
 */
export class msdyn_EnableDVCopilotResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_EnableDVCopilot");
  }

  static fromResponse(_data: unknown): msdyn_EnableDVCopilotResponse {
    return new msdyn_EnableDVCopilotResponse();
  }
}
