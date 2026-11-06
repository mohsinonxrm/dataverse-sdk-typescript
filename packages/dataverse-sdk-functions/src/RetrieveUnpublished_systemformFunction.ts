import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { systemform } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_systemformResponse extends systemform {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.systemform)
 *
 * The first argument is the id of the systemform record to call it on.
 */
export class RetrieveUnpublished_systemformFunction implements Executable<RetrieveUnpublished_systemformResponse> {
  constructor(public readonly systemformId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/systemforms(${this.systemformId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_systemformResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveUnpublished_systemformResponse;
  }
}
