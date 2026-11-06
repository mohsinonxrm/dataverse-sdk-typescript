import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginconversationstarter } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_aipluginconversationstarterResponse extends aipluginconversationstarter {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.aipluginconversationstarter)
 */
export class RetrieveUnpublished_aipluginconversationstarterFunction implements Executable<RetrieveUnpublished_aipluginconversationstarterResponse> {
  constructor(public readonly aipluginconversationstarterId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/aipluginconversationstarters(${this.aipluginconversationstarterId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(
    response: Response
  ): Promise<RetrieveUnpublished_aipluginconversationstarterResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_aipluginconversationstarterResponse;
  }
}
