import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofileitem } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_mobileofflineprofileitemResponse extends mobileofflineprofileitem {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.mobileofflineprofileitem)
 */
export class RetrieveUnpublished_mobileofflineprofileitemFunction implements Executable<RetrieveUnpublished_mobileofflineprofileitemResponse> {
  constructor(public readonly mobileofflineprofileitemId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/mobileofflineprofileitems(${this.mobileofflineprofileitemId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

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
  ): Promise<RetrieveUnpublished_mobileofflineprofileitemResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_mobileofflineprofileitemResponse;
  }
}
