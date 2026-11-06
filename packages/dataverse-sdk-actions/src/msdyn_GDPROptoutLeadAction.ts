import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GDPROptoutLead action
 */
export interface msdyn_GDPROptoutLeadResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_GDPROptoutLead action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GDPROptoutLeadActionParameters {
  optout: boolean;
}

/**
 * msdyn_GDPROptoutLead action
 *
 * Bound action
 * Binding parameter: entity (mscrm.lead)
 *
 * The first argument is the id of the lead record to call it on.
 */
export class msdyn_GDPROptoutLeadAction implements Executable<msdyn_GDPROptoutLeadResponse> {
  constructor(
    public readonly leadId: string,
    public readonly parameters: msdyn_GDPROptoutLeadActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${this.leadId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutLead`;

    const body = requestBody({
      optout: this.parameters.optout,
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

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutLeadResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GDPROptoutLeadResponse;
    return (await response.json()) as msdyn_GDPROptoutLeadResponse;
  }
}
