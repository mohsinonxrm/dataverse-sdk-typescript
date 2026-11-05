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
    // No return value (204 No Content)
    return {};
  }
}
