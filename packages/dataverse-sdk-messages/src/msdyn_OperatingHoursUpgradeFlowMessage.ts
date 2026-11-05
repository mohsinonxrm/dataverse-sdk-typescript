import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_OperatingHoursUpgradeFlow request message
 *
 * Web API Action: msdyn_OperatingHoursUpgradeFlow
 */
export class msdyn_OperatingHoursUpgradeFlowRequest
  extends OrganizationRequest
  implements Executable<msdyn_OperatingHoursUpgradeFlowResponse>
{
  constructor() {
    super("msdyn_OperatingHoursUpgradeFlow");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OperatingHoursUpgradeFlow`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_OperatingHoursUpgradeFlowResponse> {
    // No return value (204 No Content)
    return new msdyn_OperatingHoursUpgradeFlowResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_OperatingHoursUpgradeFlow response message
 */
export class msdyn_OperatingHoursUpgradeFlowResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_OperatingHoursUpgradeFlow");
  }

  static fromResponse(_data: unknown): msdyn_OperatingHoursUpgradeFlowResponse {
    return new msdyn_OperatingHoursUpgradeFlowResponse();
  }
}
