import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PostCreateAutonomousEmail action
 */
export interface msdyn_PostCreateAutonomousEmailResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_PostCreateAutonomousEmailResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_PostCreateAutonomousEmailResponse;
    return (await response.json()) as msdyn_PostCreateAutonomousEmailResponse;
  }
}
