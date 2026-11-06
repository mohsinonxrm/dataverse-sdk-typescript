import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetORReasonExplanation action
 */
export interface msdyn_GetORReasonExplanationResponse {
  ExplanationResult: string;
}

/**
 * Parameters of the msdyn_GetORReasonExplanation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetORReasonExplanationActionParameters {
  EntityId: string;
  ExplanationObject: string;
  EntityType: number;
}

/**
 * msdyn_GetORReasonExplanation action
 *
 * Unbound action
 */
export class msdyn_GetORReasonExplanationAction implements Executable<msdyn_GetORReasonExplanationResponse> {
  constructor(public readonly parameters: msdyn_GetORReasonExplanationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetORReasonExplanation`;

    const body = requestBody({
      EntityId: this.parameters.EntityId,
      ExplanationObject: this.parameters.ExplanationObject,
      EntityType: this.parameters.EntityType,
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

  async parseResponse(response: Response): Promise<msdyn_GetORReasonExplanationResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetORReasonExplanationResponse;
    return (await response.json()) as msdyn_GetORReasonExplanationResponse;
  }
}
