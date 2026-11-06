import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { savedqueryvisualization } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_savedqueryvisualizationResponse extends savedqueryvisualization {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.savedqueryvisualization)
 */
export class RetrieveUnpublished_savedqueryvisualizationFunction implements Executable<RetrieveUnpublished_savedqueryvisualizationResponse> {
  constructor(public readonly savedqueryvisualizationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/savedqueryvisualizations(${this.savedqueryvisualizationId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

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
  ): Promise<RetrieveUnpublished_savedqueryvisualizationResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_savedqueryvisualizationResponse;
  }
}
