import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesMeetingPreparation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesMeetingPreparationResponse {
  "@odata.context"?: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
  msdyn_version: string;
}

/**
 * Parameters of the msdyn_SalesMeetingPreparation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesMeetingPreparationActionParameters {
  msdyn_responseFormat?: string;
  msdyn_activityId?: string;
  msdyn_sessionId?: string;
  msdyn_id: string;
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
      msdyn_responseFormat: this.parameters.msdyn_responseFormat,
      msdyn_activityId: this.parameters.msdyn_activityId,
      msdyn_sessionId: this.parameters.msdyn_sessionId,
      msdyn_id: this.parameters.msdyn_id,
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesMeetingPreparationResponse;
  }
}
