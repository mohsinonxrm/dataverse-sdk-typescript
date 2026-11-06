import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesOutlookMeetingPreparation action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesOutlookMeetingPreparationResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesOutlookMeetingPreparationResponse;
  }
}
