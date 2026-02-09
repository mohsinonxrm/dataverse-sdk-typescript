import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
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

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_occommunicationprovidersettingId,
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyResourceDeprovisionAction response message
 */
export class msdyn_TelephonyResourceDeprovisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyResourceDeprovisionActionResponse) {
    super("msdyn_TelephonyResourceDeprovisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyResourceDeprovisionActionResponse {
    return new msdyn_TelephonyResourceDeprovisionActionResponse((data as any).value);
  }
}
