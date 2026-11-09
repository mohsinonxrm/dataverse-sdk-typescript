import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_PostCreateAutonomousEmail action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_PostCreateAutonomousEmailResponse = void;

/**
 * Parameters of the msdyn_PostCreateAutonomousEmail action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PostCreateAutonomousEmailActionParameters {
  EmailGuid: string;
}

/**
 * msdyn_PostCreateAutonomousEmail action
 *
 * Unbound action
 */
export class msdyn_PostCreateAutonomousEmailAction implements Executable<msdyn_PostCreateAutonomousEmailResponse> {
  constructor(public readonly parameters: msdyn_PostCreateAutonomousEmailActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PostCreateAutonomousEmail`;

    const body = requestBody({
      EmailGuid: this.parameters.EmailGuid,
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

  parseResponse(_response: Response): Promise<msdyn_PostCreateAutonomousEmailResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
