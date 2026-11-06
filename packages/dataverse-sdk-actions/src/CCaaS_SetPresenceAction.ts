import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_SetPresence action
 */
export interface CCaaS_SetPresenceResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<CCaaS_SetPresenceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_SetPresenceResponse;
    return (await response.json()) as CCaaS_SetPresenceResponse;
  }
}
