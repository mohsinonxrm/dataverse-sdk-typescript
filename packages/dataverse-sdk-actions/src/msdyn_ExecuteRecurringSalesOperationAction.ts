import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ExecuteRecurringSalesOperation action
 */
export interface msdyn_ExecuteRecurringSalesOperationResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ExecuteRecurringSalesOperation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ExecuteRecurringSalesOperationActionParameters {
  InputData?: string;
  IsRSAV2Entity?: boolean;
  CustomActionName: string;
  TriggerName: string;
}

/**
 * msdyn_ExecuteRecurringSalesOperation action
 *
 * Unbound action
 */
export class msdyn_ExecuteRecurringSalesOperationAction implements Executable<msdyn_ExecuteRecurringSalesOperationResponse> {
  constructor(public readonly parameters: msdyn_ExecuteRecurringSalesOperationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ExecuteRecurringSalesOperation`;

    const body = requestBody({
      InputData: this.parameters.InputData,
      IsRSAV2Entity: this.parameters.IsRSAV2Entity,
      CustomActionName: this.parameters.CustomActionName,
      TriggerName: this.parameters.TriggerName,
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

  async parseResponse(response: Response): Promise<msdyn_ExecuteRecurringSalesOperationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ExecuteRecurringSalesOperationResponse;
  }
}
