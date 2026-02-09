import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TelephonyResourceProvisionActionResponse> {
    const data = await response.json();
    return msdyn_TelephonyResourceProvisionActionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.msdyn_occommunicationprovidersettingId,
      ActionRequest: this.actionRequest,
    };
  }
}

/**
 * msdyn_TelephonyResourceProvisionAction response message
 */
export class msdyn_TelephonyResourceProvisionActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_TelephonyResourceProvisionActionResponse) {
    super("msdyn_TelephonyResourceProvisionAction");
  }

  static fromResponse(data: unknown): msdyn_TelephonyResourceProvisionActionResponse {
    return new msdyn_TelephonyResourceProvisionActionResponse((data as any).value);
  }
}
