import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_iotalert } from "./types/index.js";

/**
 * msdyn_IoTNewPrimaryAlert request message
 *
 * Web API Action: msdyn_IoTNewPrimaryAlert
 */
export class msdyn_IoTNewPrimaryAlertRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTNewPrimaryAlertResponse>
{
  constructor(public primaryAlert: msdyn_iotalert) {
    super("msdyn_IoTNewPrimaryAlert");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTNewPrimaryAlert`;

    const body: Record<string, unknown> = {
      PrimaryAlert: this.primaryAlert,
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

  async parseResponse(response: Response): Promise<msdyn_IoTNewPrimaryAlertResponse> {
    // No return value (204 No Content)
    return new msdyn_IoTNewPrimaryAlertResponse();
  }
}

/**
 * msdyn_IoTNewPrimaryAlert response message
 */
export class msdyn_IoTNewPrimaryAlertResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IoTNewPrimaryAlert");
  }

  static fromResponse(_data: unknown): msdyn_IoTNewPrimaryAlertResponse {
    return new msdyn_IoTNewPrimaryAlertResponse();
  }
}
