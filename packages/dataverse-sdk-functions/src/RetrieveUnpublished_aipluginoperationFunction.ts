import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginoperation } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_aipluginoperationResponse extends aipluginoperation {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.aipluginoperation)
 *
 * The first argument is the id of the aipluginoperation record to call it on.
 */
export class RetrieveUnpublished_aipluginoperationFunction implements Executable<RetrieveUnpublished_aipluginoperationResponse> {
  constructor(public readonly aipluginoperationId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/aipluginoperations(${this.aipluginoperationId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublished_aipluginoperationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as RetrieveUnpublished_aipluginoperationResponse;
    return (await response.json()) as RetrieveUnpublished_aipluginoperationResponse;
  }
}
