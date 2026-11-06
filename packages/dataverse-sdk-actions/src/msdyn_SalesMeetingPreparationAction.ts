import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesMeetingPreparation action
 */
export interface msdyn_SalesMeetingPreparationResponse {
  msdyn_summary_raw: string;
  msdyn_version: string;
  msdyn_summary: string;
}

/**
 * Parameters of the msdyn_SalesMeetingPreparation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesMeetingPreparationActionParameters {
  msdyn_sessionId?: string;
  msdyn_activityId?: string;
  msdyn_id: string;
  msdyn_responseFormat?: string;
}

/**
 * msdyn_SalesMeetingPreparation action
 *
 * Unbound action
 */
export class msdyn_SalesMeetingPreparationAction implements Executable<msdyn_SalesMeetingPreparationResponse> {
  constructor(public readonly parameters: msdyn_SalesMeetingPreparationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesMeetingPreparation`;

    const body = requestBody({
      msdyn_sessionId: this.parameters.msdyn_sessionId,
      msdyn_activityId: this.parameters.msdyn_activityId,
      msdyn_id: this.parameters.msdyn_id,
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
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

  async parseResponse(response: Response): Promise<msdyn_SalesMeetingPreparationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesMeetingPreparationResponse;
  }
}
