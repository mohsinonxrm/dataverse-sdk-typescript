import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesAdaptiveCardResponse action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesAdaptiveCardResponseResponse {
  "@odata.context"?: string;
  msdyn_additionalDetails: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * Parameters of the msdyn_SalesAdaptiveCardResponse action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesAdaptiveCardResponseActionParameters {
  msdyn_scenario: number;
  msdyn_id?: string;
  msdyn_query?: string;
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
      msdyn_scenario: this.parameters.msdyn_scenario,
      msdyn_id: this.parameters.msdyn_id,
      msdyn_query: this.parameters.msdyn_query,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesAdaptiveCardResponseResponse;
  }
}
