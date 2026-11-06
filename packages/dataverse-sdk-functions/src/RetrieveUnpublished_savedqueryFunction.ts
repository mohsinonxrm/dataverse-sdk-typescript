import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { savedquery } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_savedqueryResponse extends savedquery {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.savedquery)
 */
export class RetrieveUnpublished_savedqueryFunction implements Executable<RetrieveUnpublished_savedqueryResponse> {
  constructor(public readonly savedqueryId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/savedqueries(${this.savedqueryId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_savedqueryResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_savedqueryResponse;
  }
}
