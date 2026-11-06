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
 *
 * The first argument is the id of the webresource record to call it on.
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveUnpublished_webresourceResponse;
  }
}
