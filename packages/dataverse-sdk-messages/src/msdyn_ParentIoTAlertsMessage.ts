import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_ParentIoTAlerts message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ParentIoTAlertsRequestParameters {
  TimespanSeconds: number;
}

/**
 * msdyn_ParentIoTAlerts request message
 *
 * Web API Action: msdyn_ParentIoTAlerts
 *
 * The first argument is the id of the msdyn_iotalert record to call it on.
 */
export class msdyn_ParentIoTAlertsRequest
  extends OrganizationRequest
  implements Executable<msdyn_ParentIoTAlertsResponse>
{
  declare readonly Parameters: Readonly<msdyn_ParentIoTAlertsRequestParameters>;

  constructor(
    public msdyn_iotalertId: string,
    parameters: msdyn_ParentIoTAlertsRequestParameters
  ) {
    super("msdyn_ParentIoTAlerts", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_iotalerts(${this.msdyn_iotalertId})/Microsoft.Dynamics.CRM.msdyn_ParentIoTAlerts`;

    const body = requestBody({
      TimespanSeconds: this.Parameters.TimespanSeconds,
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

  async parseResponse(response: Response): Promise<msdyn_ParentIoTAlertsResponse> {
    // No return value (204 No Content)
    return new msdyn_ParentIoTAlertsResponse();
  }
}

/**
 * msdyn_ParentIoTAlerts response message
 */
export class msdyn_ParentIoTAlertsResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_ParentIoTAlerts");
  }

  static fromResponse(_data: unknown): msdyn_ParentIoTAlertsResponse {
    return new msdyn_ParentIoTAlertsResponse();
  }
}
