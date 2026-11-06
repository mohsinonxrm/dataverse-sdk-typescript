import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_SalesExternalServiceInvoke action
 */
export interface msdyn_SalesExternalServiceInvokeResponse {
  msdyn_summary_raw: string;
  msdyn_summary: string;
  msdyn_additionalDetails: string;
}

/**
 * Parameters of the msdyn_SalesExternalServiceInvoke action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SalesExternalServiceInvokeActionParameters {
  msdyn_entityName: string;
  msdyn_activityId?: string;
  msdyn_id: string;
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
      msdyn_activityId: this.parameters.msdyn_activityId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesExternalServiceInvokeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_SalesExternalServiceInvokeResponse;
  }
}
