import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_sendFeedback action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_sendFeedbackResponse = void;

/**
 * Parameters of the msdyn_sendFeedback action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_sendFeedbackActionParameters {
  content: string;
}

/**
 * msdyn_sendFeedback action
 *
 * Unbound action
 */
export class msdyn_sendFeedbackAction implements Executable<msdyn_sendFeedbackResponse> {
  constructor(public readonly parameters: msdyn_sendFeedbackActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_sendFeedback`;

    const body = requestBody({
      content: this.parameters.content,
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

  parseResponse(_response: Response): Promise<msdyn_sendFeedbackResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
