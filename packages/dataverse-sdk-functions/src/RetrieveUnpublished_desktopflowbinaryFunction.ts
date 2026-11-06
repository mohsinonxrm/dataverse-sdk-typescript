import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { desktopflowbinary } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_desktopflowbinaryResponse extends desktopflowbinary {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.desktopflowbinary)
 *
 * The first argument is the id of the desktopflowbinary record to call it on.
 */
export class RetrieveUnpublished_desktopflowbinaryFunction implements Executable<RetrieveUnpublished_desktopflowbinaryResponse> {
  constructor(public readonly desktopflowbinaryId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/desktopflowbinaries(${this.desktopflowbinaryId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_desktopflowbinaryResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveUnpublished_desktopflowbinaryResponse;
  }
}
