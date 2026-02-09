import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GDPROptoutLead action
 */
export interface msdyn_GDPROptoutLeadResponse {
  // No content returned
}

/**
 * msdyn_GDPROptoutLead action
 *
 * Bound action
 * Binding parameter: entity (mscrm.lead)
 */
export class msdyn_GDPROptoutLeadAction implements Executable<msdyn_GDPROptoutLeadResponse> {
  constructor(
    public readonly leadId: string,
    public readonly optout: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/leads(${this.leadId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutLead`;

    const body: Record<string, unknown> = {
      optout: this.optout,
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

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutLeadResponse> {
    // No return value (204 No Content)
    return {};
  }
}
