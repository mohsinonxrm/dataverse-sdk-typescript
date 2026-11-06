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
  secondaryActionType: string;
  actionType: string;
  correlationId: string;
  workflowId: string;
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
      secondaryActionType: this.parameters.secondaryActionType,
      actionType: this.parameters.actionType,
      correlationId: this.parameters.correlationId,
      workflowId: this.parameters.workflowId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetDynamicFieldsForActionTypeResponse;
    return (await response.json()) as msdyn_GetDynamicFieldsForActionTypeResponse;
  }
}
