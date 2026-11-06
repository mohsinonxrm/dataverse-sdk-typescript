import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ActionCardCreate action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ActionCardCreateResponse = void;

/**
 * Parameters of the msdyn_ActionCardCreate action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ActionCardCreateActionParameters {
  actionCardCreateParams: string;
}

/**
 * msdyn_ActionCardCreate action
 *
 * Unbound action
 */
export class msdyn_ActionCardCreateAction implements Executable<msdyn_ActionCardCreateResponse> {
  constructor(public readonly parameters: msdyn_ActionCardCreateActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ActionCardCreate`;

    const body = requestBody({
      actionCardCreateParams: this.parameters.actionCardCreateParams,
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

  parseResponse(_response: Response): Promise<msdyn_ActionCardCreateResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
