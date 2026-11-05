import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TelephonyResourceProvisionActionResponse as msdyn_TelephonyResourceProvisionActionResponseData } from "./types/index.js";

/**
 * msdyn_TelephonyResourceProvisionAction request message
 *
 * Web API Action: msdyn_TelephonyResourceProvisionAction
 */
export class msdyn_TelephonyResourceProvisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyResourceProvisionActionResponse>
{
  constructor(
    public msdyn_occommunicationprovidersettingId: string,
    public actionRequest: string
  ) {
    super("msdyn_TelephonyResourceProvisionAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_occommunicationprovidersettings(${this.msdyn_occommunicationprovidersettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyResourceProvisionAction`;

    const body: Record<string, unknown> = {
      ActionRequest: this.actionRequest,
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

  async parseResponse(response: Response): Promise<msdyn_TelephonyResourceProvisionActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyResourceProvisionActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_TelephonyResourceProvisionAction response message
 */
export class msdyn_TelephonyResourceProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyResourceProvisionActionResponseData) {
    super("msdyn_TelephonyResourceProvisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyResourceProvisionActionResponse {
    return new msdyn_TelephonyResourceProvisionActionResponse(
      responseObject<msdyn_TelephonyResourceProvisionActionResponseData>(data)
    );
  }
}
