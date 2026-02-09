import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaCreateBotComponents action
 */
export interface PvaCreateBotComponentsResponse {
  // No content returned
}

/**
 * PvaCreateBotComponents action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 */
export class PvaCreateBotComponentsAction implements Executable<PvaCreateBotComponentsResponse> {
  constructor(
    public readonly botId: string,
    public readonly botComponents: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaCreateBotComponents`;

    const body: Record<string, unknown> = {
      BotComponents: this.botComponents,
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

  async parseResponse(response: Response): Promise<PvaCreateBotComponentsResponse> {
    // No return value (204 No Content)
    return {};
  }
}
