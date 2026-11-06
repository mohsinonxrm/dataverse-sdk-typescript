import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_SetPresence action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CCaaS_SetPresenceResponse = void;

/**
 * Parameters of the CCaaS_SetPresence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SetPresenceActionParameters {
  PresenceId: string;
  ApiVersion: string;
}

/**
 * CCaaS_SetPresence action
 *
 * Unbound action
 */
export class CCaaS_SetPresenceAction implements Executable<CCaaS_SetPresenceResponse> {
  constructor(public readonly parameters: CCaaS_SetPresenceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SetPresence`;

    const body = requestBody({
      PresenceId: this.parameters.PresenceId,
      ApiVersion: this.parameters.ApiVersion,
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

  parseResponse(_response: Response): Promise<CCaaS_SetPresenceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
