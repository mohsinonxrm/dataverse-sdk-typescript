import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PvaCreateBotComponents action
 */
export interface PvaCreateBotComponentsResponse {
  // No content returned
}

/**
 * Parameters of the PvaCreateBotComponents action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaCreateBotComponentsActionParameters {
  BotComponents: Record<string, unknown>[];
}

/**
 * PvaCreateBotComponents action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaCreateBotComponentsAction implements Executable<PvaCreateBotComponentsResponse> {
  constructor(
    public readonly botId: string,
    public readonly parameters: PvaCreateBotComponentsActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaCreateBotComponents`;

    const body = requestBody({
      BotComponents: this.parameters.BotComponents,
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

  async parseResponse(response: Response): Promise<PvaCreateBotComponentsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PvaCreateBotComponentsResponse;
    return (await response.json()) as PvaCreateBotComponentsResponse;
  }
}
