import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { mobileofflineprofile } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_mobileofflineprofileResponse extends mobileofflineprofile {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.mobileofflineprofile)
 */
export class RetrieveUnpublished_mobileofflineprofileFunction implements Executable<RetrieveUnpublished_mobileofflineprofileResponse> {
  constructor(public readonly mobileofflineprofileId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/mobileofflineprofiles(${this.mobileofflineprofileId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

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
  ): Promise<RetrieveUnpublished_mobileofflineprofileResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_mobileofflineprofileResponse;
  }
}
