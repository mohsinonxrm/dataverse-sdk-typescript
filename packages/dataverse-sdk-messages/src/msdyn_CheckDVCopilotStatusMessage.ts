import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CheckDVCopilotStatus request message
 *
 * Web API Action: msdyn_CheckDVCopilotStatus
 */
export class msdyn_CheckDVCopilotStatusRequest
  extends OrganizationRequest
  implements Executable<msdyn_CheckDVCopilotStatusResponse>
{
  constructor() {
    super("msdyn_CheckDVCopilotStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckDVCopilotStatus`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_CheckDVCopilotStatusResponse> {
    // No return value (204 No Content)
    return new msdyn_CheckDVCopilotStatusResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_CheckDVCopilotStatus response message
 */
export class msdyn_CheckDVCopilotStatusResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CheckDVCopilotStatus");
  }

  static fromResponse(_data: unknown): msdyn_CheckDVCopilotStatusResponse {
    return new msdyn_CheckDVCopilotStatusResponse();
  }
}
