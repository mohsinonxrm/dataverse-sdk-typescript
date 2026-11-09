import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the PvaPublish action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaPublishResponse {
  "@odata.context"?: string;
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
    const url = `${baseUrl}/bots(${odataLiteral.guid(this.botId)})/Microsoft.Dynamics.CRM.PvaPublish`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaPublishResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PvaPublishResponse;
  }
}
