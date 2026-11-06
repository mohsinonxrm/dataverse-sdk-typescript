import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_FetchCannedPrompts action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_FetchCannedPromptsResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_FetchCannedPromptsResponse;
  }
}
