import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aiplugintitle } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_aiplugintitleResponse extends aiplugintitle {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.aiplugintitle)
 *
 * The first argument is the id of the aiplugintitle record to call it on.
 */
export class RetrieveUnpublished_aiplugintitleFunction implements Executable<RetrieveUnpublished_aiplugintitleResponse> {
  constructor(public readonly aiplugintitleId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/aiplugintitles(${this.aiplugintitleId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_aiplugintitleResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUnpublished_aiplugintitleResponse;
    return (await response.json()) as RetrieveUnpublished_aiplugintitleResponse;
  }
}
