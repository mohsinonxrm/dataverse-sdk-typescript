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
    const data = await response.json();
    return data as RetrieveUnpublished_systemformResponse;
  }
}
