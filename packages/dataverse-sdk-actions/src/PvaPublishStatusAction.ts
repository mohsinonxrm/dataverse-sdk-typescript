import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PvaPublishStatus action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface PvaPublishStatusResponse {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  [column: string]: unknown;
}

/**
 * Parameters of the PvaPublishStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaPublishStatusActionParameters {
  PublishBotJob: string;
}

/**
 * PvaPublishStatus action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaPublishStatusAction implements Executable<PvaPublishStatusResponse> {
  constructor(
    public readonly botId: string,
    public readonly parameters: PvaPublishStatusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaPublishStatus`;

    const body = requestBody({
      PublishBotJob: this.parameters.PublishBotJob,
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

  async parseResponse(response: Response): Promise<PvaPublishStatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as PvaPublishStatusResponse;
  }
}
