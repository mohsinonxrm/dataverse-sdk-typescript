import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RunSAUpgradeScript request message
 *
 * Web API Action: msdyn_RunSAUpgradeScript
 */
export class msdyn_RunSAUpgradeScriptRequest
  extends OrganizationRequest
  implements Executable<msdyn_RunSAUpgradeScriptResponse>
{
  constructor() {
    super("msdyn_RunSAUpgradeScript");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RunSAUpgradeScript`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_RunSAUpgradeScriptResponse> {
    // No return value (204 No Content)
    return new msdyn_RunSAUpgradeScriptResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_RunSAUpgradeScript response message
 */
export class msdyn_RunSAUpgradeScriptResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RunSAUpgradeScript");
  }

  static fromResponse(_data: unknown): msdyn_RunSAUpgradeScriptResponse {
    return new msdyn_RunSAUpgradeScriptResponse();
  }
}
