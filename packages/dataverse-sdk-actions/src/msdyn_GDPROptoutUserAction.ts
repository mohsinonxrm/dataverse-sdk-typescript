import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GDPROptoutUser action
 */
export interface msdyn_GDPROptoutUserResponse {
  // No content returned
}

/**
 * msdyn_GDPROptoutUser action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 */
export class msdyn_GDPROptoutUserAction implements Executable<msdyn_GDPROptoutUserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly optout: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutUser`;

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

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutUserResponse> {
    // No return value (204 No Content)
    return {};
  }
}
