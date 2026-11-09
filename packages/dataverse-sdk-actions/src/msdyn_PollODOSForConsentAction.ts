import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_PollODOSForConsent action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_PollODOSForConsentResponse = void;

/**
 * Parameters of the msdyn_PollODOSForConsent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PollODOSForConsentActionParameters {
  InputData: string;
}

/**
 * msdyn_PollODOSForConsent action
 *
 * Unbound action
 */
export class msdyn_PollODOSForConsentAction implements Executable<msdyn_PollODOSForConsentResponse> {
  constructor(public readonly parameters: msdyn_PollODOSForConsentActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PollODOSForConsent`;

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

  parseResponse(_response: Response): Promise<msdyn_PollODOSForConsentResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
