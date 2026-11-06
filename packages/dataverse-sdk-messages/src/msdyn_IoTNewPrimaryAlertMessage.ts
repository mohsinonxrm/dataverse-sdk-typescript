import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_iotalert } from "./types/index.js";

/**
 * Parameters of the msdyn_IoTNewPrimaryAlert message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTNewPrimaryAlertRequestParameters {
  PrimaryAlert: EntityReference | EntityPayload<msdyn_iotalert>;
}

/**
 * msdyn_IoTNewPrimaryAlert request message
 *
 * Web API Action: msdyn_IoTNewPrimaryAlert
 */
export class msdyn_IoTNewPrimaryAlertRequest
  extends OrganizationRequest
  implements Executable<msdyn_IoTNewPrimaryAlertResponse>
{
  declare readonly Parameters: Readonly<msdyn_IoTNewPrimaryAlertRequestParameters>;

  constructor(parameters: msdyn_IoTNewPrimaryAlertRequestParameters) {
    super("msdyn_IoTNewPrimaryAlert", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTNewPrimaryAlert`;

    const body = requestBody({
      PrimaryAlert: this.Parameters.PrimaryAlert,
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

  parseResponse(_response: Response): Promise<msdyn_IoTNewPrimaryAlertResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_IoTNewPrimaryAlertResponse());
  }
}

/**
 * msdyn_IoTNewPrimaryAlert response message
 */
export class msdyn_IoTNewPrimaryAlertResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_IoTNewPrimaryAlert");
  }

  static fromResponse(_data?: unknown): msdyn_IoTNewPrimaryAlertResponse {
    return new msdyn_IoTNewPrimaryAlertResponse();
  }
}
