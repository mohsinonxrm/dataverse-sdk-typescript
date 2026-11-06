import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appconfiginstance } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_appconfiginstanceResponse extends appconfiginstance {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.appconfiginstance)
 *
 * The first argument is the id of the appconfiginstance record to call it on.
 */
export class RetrieveUnpublished_appconfiginstanceFunction implements Executable<RetrieveUnpublished_appconfiginstanceResponse> {
  constructor(public readonly appconfiginstanceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/appconfiginstances(${this.appconfiginstanceId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_appconfiginstanceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveUnpublished_appconfiginstanceResponse;
  }
}
