import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ExecuteRecurringSalesOperation action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ExecuteRecurringSalesOperationResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_ExecuteRecurringSalesOperationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
