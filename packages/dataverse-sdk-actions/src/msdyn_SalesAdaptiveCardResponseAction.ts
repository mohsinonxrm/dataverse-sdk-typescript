import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesAdaptiveCardResponse action
 */
export interface msdyn_SalesAdaptiveCardResponseResponse {
  msdyn_additionalDetails: string;
  msdyn_summary: string;
  msdyn_version: string;
  msdyn_summary_raw: string;
}

/**
 * Parameters of the msdyn_SalesAdaptiveCardResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAdaptiveCardResponseActionParameters {
  msdyn_query?: string;
  msdyn_id?: string;
  msdyn_scenario: number;
}

/**
 * msdyn_SalesAdaptiveCardResponse action
 *
 * Unbound action
 */
export class msdyn_SalesAdaptiveCardResponseAction implements Executable<msdyn_SalesAdaptiveCardResponseResponse> {
  constructor(public readonly parameters: msdyn_SalesAdaptiveCardResponseActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAdaptiveCardResponse`;

    const body = requestBody({
      msdyn_query: this.parameters.msdyn_query,
      msdyn_id: this.parameters.msdyn_id,
      msdyn_scenario: this.parameters.msdyn_scenario,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_SalesAdaptiveCardResponseResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesAdaptiveCardResponseResponse;
    return (await response.json()) as msdyn_SalesAdaptiveCardResponseResponse;
  }
}
