import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginconversationstartermapping } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_aipluginconversationstartermappingResponse extends aipluginconversationstartermapping {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.aipluginconversationstartermapping)
 */
export class RetrieveUnpublished_aipluginconversationstartermappingFunction implements Executable<RetrieveUnpublished_aipluginconversationstartermappingResponse> {
  constructor(public readonly aipluginconversationstartermappingId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/aipluginconversationstartermappings(${this.aipluginconversationstartermappingId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

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
  ): Promise<RetrieveUnpublished_aipluginconversationstartermappingResponse> {
    const data = await response.json();
    return data as RetrieveUnpublished_aipluginconversationstartermappingResponse;
  }
}
