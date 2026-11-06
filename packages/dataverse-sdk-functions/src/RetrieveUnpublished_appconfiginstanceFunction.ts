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
    const data = await response.json();
    return data as RetrieveUnpublished_appconfiginstanceResponse;
  }
}
