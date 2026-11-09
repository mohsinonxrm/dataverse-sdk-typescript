import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GetCopilotServiceStream action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_GetCopilotServiceStreamResponse = void;

/**
 * Parameters of the msdyn_GetCopilotServiceStream action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetCopilotServiceStreamActionParameters {
  Context: string;
  RequestPayload?: string;
}

/**
 * msdyn_GetCopilotServiceStream action
 *
 * Unbound action
 */
export class msdyn_GetCopilotServiceStreamAction implements Executable<msdyn_GetCopilotServiceStreamResponse> {
  constructor(public readonly parameters: msdyn_GetCopilotServiceStreamActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetCopilotServiceStream`;

    const body = requestBody({
      Context: this.parameters.Context,
      RequestPayload: this.parameters.RequestPayload,
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

  parseResponse(_response: Response): Promise<msdyn_GetCopilotServiceStreamResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
