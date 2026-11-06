import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesOutlookMeetingPreparation action
 */
export interface msdyn_SalesOutlookMeetingPreparationResponse {
  msdyn_error: string;
  msdyn_result: string;
  msdyn_status: number;
}

/**
 * Parameters of the msdyn_SalesOutlookMeetingPreparation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesOutlookMeetingPreparationActionParameters {
  msdyn_type: string;
  msdyn_id: string;
}

/**
 * msdyn_SalesOutlookMeetingPreparation action
 *
 * Unbound action
 */
export class msdyn_SalesOutlookMeetingPreparationAction implements Executable<msdyn_SalesOutlookMeetingPreparationResponse> {
  constructor(public readonly parameters: msdyn_SalesOutlookMeetingPreparationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOutlookMeetingPreparation`;

    const body = requestBody({
      msdyn_type: this.parameters.msdyn_type,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOutlookMeetingPreparationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_SalesOutlookMeetingPreparationResponse;
    return (await response.json()) as msdyn_SalesOutlookMeetingPreparationResponse;
  }
}
