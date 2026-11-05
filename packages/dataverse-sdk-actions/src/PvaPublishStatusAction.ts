import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from PvaPublishStatus action
 */
export interface PvaPublishStatusResponse {
  value: EntityReference;
}

/**
 * PvaPublishStatus action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 */
export class PvaPublishStatusAction implements Executable<PvaPublishStatusResponse> {
  constructor(
    public readonly botId: string,
    public readonly publishBotJob: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaPublishStatus`;

    const body: Record<string, unknown> = {
      PublishBotJob: this.publishBotJob,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PvaPublishStatusResponse> {
    const data = await response.json();
    return data as PvaPublishStatusResponse;
  }
}
