import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetDynamicFieldsForActionType action
 */
export interface msdyn_GetDynamicFieldsForActionTypeResponse {
  dynamicSchema: string;
}

/**
 * Parameters of the msdyn_GetDynamicFieldsForActionType action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetDynamicFieldsForActionTypeActionParameters {
  correlationId: string;
  workflowId: string;
  secondaryActionType: string;
  actionType: string;
}

/**
 * msdyn_GetDynamicFieldsForActionType action
 *
 * Unbound action
 */
export class msdyn_GetDynamicFieldsForActionTypeAction implements Executable<msdyn_GetDynamicFieldsForActionTypeResponse> {
  constructor(public readonly parameters: msdyn_GetDynamicFieldsForActionTypeActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetDynamicFieldsForActionType`;

    const body = requestBody({
      correlationId: this.parameters.correlationId,
      workflowId: this.parameters.workflowId,
      secondaryActionType: this.parameters.secondaryActionType,
      actionType: this.parameters.actionType,
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

  async parseResponse(response: Response): Promise<msdyn_GetDynamicFieldsForActionTypeResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetDynamicFieldsForActionTypeResponse;
  }
}
