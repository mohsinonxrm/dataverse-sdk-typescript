import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aiplugin } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_aipluginResponse extends aiplugin {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.aiplugin)
 */
export class RetrieveUnpublished_aipluginFunction implements Executable<RetrieveUnpublished_aipluginResponse> {
  constructor(public readonly aipluginId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/aiplugins(${this.aipluginId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_aipluginResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_aipluginResponse;
  }
}
