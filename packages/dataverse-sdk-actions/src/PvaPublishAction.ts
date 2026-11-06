import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaPublish action
 */
export interface PvaPublishResponse {
  PublishedBotContentId: string;
}

/**
 * PvaPublish action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaPublishAction implements Executable<PvaPublishResponse> {
  constructor(public readonly botId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaPublish`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaPublishResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PvaPublishResponse;
    return (await response.json()) as PvaPublishResponse;
  }
}
