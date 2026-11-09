import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SalesExternalServiceInvoke action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SalesExternalServiceInvokeResponse {
  "@odata.context"?: string;
  msdyn_additionalDetails: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
}

/**
 * Parameters of the msdyn_SalesExternalServiceInvoke action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesExternalServiceInvokeActionParameters {
  msdyn_entityName: string;
  msdyn_id: string;
  msdyn_activityId?: string;
}

/**
 * msdyn_SalesExternalServiceInvoke action
 *
 * Unbound action
 */
export class msdyn_SalesExternalServiceInvokeAction implements Executable<msdyn_SalesExternalServiceInvokeResponse> {
  constructor(public readonly parameters: msdyn_SalesExternalServiceInvokeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesExternalServiceInvoke`;

    const body = requestBody({
      msdyn_entityName: this.parameters.msdyn_entityName,
      msdyn_id: this.parameters.msdyn_id,
      msdyn_activityId: this.parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesExternalServiceInvokeResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SalesExternalServiceInvokeResponse;
  }
}
