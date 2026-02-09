import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GDPROptoutContact action
 */
export interface msdyn_GDPROptoutContactResponse {
  // No content returned
}

/**
 * msdyn_GDPROptoutContact action
 *
 * Bound action
 * Binding parameter: entity (mscrm.contact)
 */
export class msdyn_GDPROptoutContactAction implements Executable<msdyn_GDPROptoutContactResponse> {
  constructor(
    public readonly contactId: string,
    public readonly optout: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/contacts(${this.contactId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutContact`;

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

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutContactResponse> {
    // No return value (204 No Content)
    return {};
  }
}
