import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { webresource } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_webresourceResponse extends webresource {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.webresource)
 */
export class RetrieveUnpublished_webresourceFunction implements Executable<RetrieveUnpublished_webresourceResponse> {
  constructor(public readonly webresourceId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/webresourceset(${this.webresourceId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_webresourceResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_webresourceResponse;
  }
}
