import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaDeleteBot action
 */
export interface PvaDeleteBotResponse {
  // No content returned
}

/**
 * PvaDeleteBot action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaDeleteBotAction implements Executable<PvaDeleteBotResponse> {
  constructor(public readonly botId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaDeleteBot`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaDeleteBotResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PvaDeleteBotResponse;
    return (await response.json()) as PvaDeleteBotResponse;
  }
}
