import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TelephonyResourceDeprovisionActionResponse as msdyn_TelephonyResourceDeprovisionActionResponseData } from "./types/index.js";

/**
 * msdyn_TelephonyResourceDeprovisionAction request message
 *
 * Web API Action: msdyn_TelephonyResourceDeprovisionAction
 */
export class msdyn_TelephonyResourceDeprovisionActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_TelephonyResourceDeprovisionActionResponse>
{
  constructor(
    public msdyn_occommunicationprovidersettingId: string,
    public actionRequest: string
  ) {
    super("msdyn_TelephonyResourceDeprovisionAction");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_occommunicationprovidersettings(${this.msdyn_occommunicationprovidersettingId})/Microsoft.Dynamics.CRM.msdyn_TelephonyResourceDeprovisionAction`;

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

  async parseResponse(
    response: Response
  ): Promise<msdyn_TelephonyResourceDeprovisionActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyResourceDeprovisionActionResponse.fromResponse(data);
  }
}

/**
 * msdyn_TelephonyResourceDeprovisionAction response message
 */
export class msdyn_TelephonyResourceDeprovisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyResourceDeprovisionActionResponseData) {
    super("msdyn_TelephonyResourceDeprovisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyResourceDeprovisionActionResponse {
    return new msdyn_TelephonyResourceDeprovisionActionResponse(
      responseObject<msdyn_TelephonyResourceDeprovisionActionResponseData>(data)
    );
  }
}
