import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { appconfig } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_appconfigResponse extends appconfig {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.appconfig)
 */
export class RetrieveUnpublished_appconfigFunction implements Executable<RetrieveUnpublished_appconfigResponse> {
  constructor(public readonly appconfigId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/appconfigs(${this.appconfigId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_appconfigResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_appconfigResponse;
  }
}
