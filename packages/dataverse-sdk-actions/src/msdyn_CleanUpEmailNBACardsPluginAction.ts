import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CleanUpEmailNBACardsPlugin action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CleanUpEmailNBACardsPluginResponse = void;

/**
 * Parameters of the msdyn_CleanUpEmailNBACardsPlugin action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CleanUpEmailNBACardsPluginActionParameters {
  InputData?: string;
}

/**
 * msdyn_CleanUpEmailNBACardsPlugin action
 *
 * Unbound action
 */
export class msdyn_CleanUpEmailNBACardsPluginAction implements Executable<msdyn_CleanUpEmailNBACardsPluginResponse> {
  constructor(public readonly parameters: msdyn_CleanUpEmailNBACardsPluginActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CleanUpEmailNBACardsPlugin`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_CleanUpEmailNBACardsPluginResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
