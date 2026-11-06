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
 *
 * The first argument is the id of the mobileofflineprofileitem record to call it on.
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUnpublished_mobileofflineprofileitemResponse;
    return (await response.json()) as RetrieveUnpublished_mobileofflineprofileitemResponse;
  }
}
