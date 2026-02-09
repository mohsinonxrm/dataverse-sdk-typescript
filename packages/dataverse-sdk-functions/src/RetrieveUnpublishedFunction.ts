import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginoperationparameter } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 */
export interface RetrieveUnpublishedResponse {
  value: aipluginoperationparameter;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.aipluginoperationparameter)
 */
export class RetrieveUnpublishedFunction implements Executable<RetrieveUnpublishedResponse> {
  constructor(public readonly aipluginoperationparameterId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound function
    let url = `${baseUrl}/aipluginoperationparameters(${this.aipluginoperationparameterId})/Microsoft.Dynamics.CRM.RetrieveUnpublished`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RetrieveUnpublishedResponse> {
    const data = await response.json();
    return data as RetrieveUnpublishedResponse;
  }
}
