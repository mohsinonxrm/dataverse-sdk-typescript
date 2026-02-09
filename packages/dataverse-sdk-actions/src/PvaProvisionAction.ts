import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaProvision action
 */
export interface PvaProvisionResponse {
  // No content returned
}

/**
 * PvaProvision action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 */
export class PvaProvisionAction implements Executable<PvaProvisionResponse> {
  constructor(public readonly botId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaProvision`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaProvisionResponse> {
    // No return value (204 No Content)
    return {};
  }
}
