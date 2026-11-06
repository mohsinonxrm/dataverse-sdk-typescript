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
 *
 * The first argument is the id of the bot record to call it on.
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaProvisionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PvaProvisionResponse;
    return (await response.json()) as PvaProvisionResponse;
  }
}
