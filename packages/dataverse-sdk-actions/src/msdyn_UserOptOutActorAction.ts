import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_UserOptOutActor action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_UserOptOutActorResponse = void;

/**
 * Parameters of the msdyn_UserOptOutActor action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UserOptOutActorActionParameters {
  InputData: string;
}

/**
 * msdyn_UserOptOutActor action
 *
 * Unbound action
 */
export class msdyn_UserOptOutActorAction implements Executable<msdyn_UserOptOutActorResponse> {
  constructor(public readonly parameters: msdyn_UserOptOutActorActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UserOptOutActor`;

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

  parseResponse(_response: Response): Promise<msdyn_UserOptOutActorResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
