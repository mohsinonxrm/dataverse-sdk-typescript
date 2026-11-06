import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_DismissSuggestedActivity action
 */
export interface msdyn_DismissSuggestedActivityResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_DismissSuggestedActivity action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_DismissSuggestedActivityActionParameters {
  SuggestedActivityId: string;
  DismissActivity: boolean;
}

/**
 * msdyn_DismissSuggestedActivity action
 *
 * Unbound action
 */
export class msdyn_DismissSuggestedActivityAction implements Executable<msdyn_DismissSuggestedActivityResponse> {
  constructor(public readonly parameters: msdyn_DismissSuggestedActivityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_DismissSuggestedActivity`;

    const body = requestBody({
      SuggestedActivityId: this.parameters.SuggestedActivityId,
      DismissActivity: this.parameters.DismissActivity,
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

  async parseResponse(response: Response): Promise<msdyn_DismissSuggestedActivityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_DismissSuggestedActivityResponse;
    return (await response.json()) as msdyn_DismissSuggestedActivityResponse;
  }
}
