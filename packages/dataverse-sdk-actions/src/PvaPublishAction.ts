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
    const data = await response.json();
    return data as PvaPublishResponse;
  }
}
