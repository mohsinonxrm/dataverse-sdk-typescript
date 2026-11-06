import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetSequenceAnalyticsKPIs action
 */
export interface msdyn_GetSequenceAnalyticsKPIsResponse {
  SequenceAnalyticsKPIs: string;
}

/**
 * Parameters of the msdyn_GetSequenceAnalyticsKPIs action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetSequenceAnalyticsKPIsActionParameters {
  SequenceId: string;
  SequenceStepId?: string;
  StartDate: string;
  EndDate: string;
  Configuration: number;
}

/**
 * msdyn_GetSequenceAnalyticsKPIs action
 *
 * Unbound action
 */
export class msdyn_GetSequenceAnalyticsKPIsAction implements Executable<msdyn_GetSequenceAnalyticsKPIsResponse> {
  constructor(public readonly parameters: msdyn_GetSequenceAnalyticsKPIsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSequenceAnalyticsKPIs`;

    const body = requestBody({
      SequenceId: this.parameters.SequenceId,
      SequenceStepId: this.parameters.SequenceStepId,
      StartDate: this.parameters.StartDate,
      EndDate: this.parameters.EndDate,
      Configuration: this.parameters.Configuration,
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

  async parseResponse(response: Response): Promise<msdyn_GetSequenceAnalyticsKPIsResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetSequenceAnalyticsKPIsResponse;
  }
}
