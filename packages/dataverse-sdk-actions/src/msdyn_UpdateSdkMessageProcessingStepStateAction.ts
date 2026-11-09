import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UpdateSdkMessageProcessingStepState action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UpdateSdkMessageProcessingStepStateResponse = void;

/**
 * Parameters of the msdyn_UpdateSdkMessageProcessingStepState action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateSdkMessageProcessingStepStateActionParameters {
  msdyn_IsEnabled: boolean;
}

/**
 * msdyn_UpdateSdkMessageProcessingStepState action
 *
 * Unbound action
 */
export class msdyn_UpdateSdkMessageProcessingStepStateAction implements Executable<msdyn_UpdateSdkMessageProcessingStepStateResponse> {
  constructor(
    public readonly parameters: msdyn_UpdateSdkMessageProcessingStepStateActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateSdkMessageProcessingStepState`;

    const body = requestBody({
      msdyn_IsEnabled: this.parameters.msdyn_IsEnabled,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateSdkMessageProcessingStepStateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
