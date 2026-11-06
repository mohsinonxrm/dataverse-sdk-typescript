import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { aipluginoperationparameter } from "./types/index.js";

/**
 * Response from RetrieveUnpublished function
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface RetrieveUnpublished_aipluginoperationparameterResponse extends aipluginoperationparameter {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * RetrieveUnpublished function
 *
 * Bound function
 * Binding parameter: entity (mscrm.aipluginoperationparameter)
 *
 * The first argument is the id of the aipluginoperationparameter record to call it on.
 */
export class RetrieveUnpublished_aipluginoperationparameterFunction implements Executable<RetrieveUnpublished_aipluginoperationparameterResponse> {
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

  async parseResponse(
    response: Response
  ): Promise<RetrieveUnpublished_aipluginoperationparameterResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RetrieveUnpublished_aipluginoperationparameterResponse;
  }
}
