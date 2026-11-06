import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_FetchCannedPrompts action
 */
export interface msdyn_FetchCannedPromptsResponse {
  cannedprompts: string;
  errormessage: string;
}

/**
 * Parameters of the msdyn_FetchCannedPrompts action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_FetchCannedPromptsActionParameters {
  scenarioid: string;
  scenariotype: string;
}

/**
 * msdyn_FetchCannedPrompts action
 *
 * Unbound action
 */
export class msdyn_FetchCannedPromptsAction implements Executable<msdyn_FetchCannedPromptsResponse> {
  constructor(public readonly parameters: msdyn_FetchCannedPromptsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_FetchCannedPrompts`;

    const body = requestBody({
      scenarioid: this.parameters.scenarioid,
      scenariotype: this.parameters.scenariotype,
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

  async parseResponse(response: Response): Promise<msdyn_FetchCannedPromptsResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_FetchCannedPromptsResponse;
    return (await response.json()) as msdyn_FetchCannedPromptsResponse;
  }
}
