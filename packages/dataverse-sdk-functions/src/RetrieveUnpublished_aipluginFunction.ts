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
 *
 * The first argument is the id of the aiplugin record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUnpublished_aipluginResponse;
    return (await response.json()) as RetrieveUnpublished_aipluginResponse;
  }
}
