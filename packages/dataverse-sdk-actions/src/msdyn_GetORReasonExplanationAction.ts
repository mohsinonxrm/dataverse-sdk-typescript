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
  EntityType: number;
  ExplanationObject: string;
  EntityId: string;
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
      EntityType: this.parameters.EntityType,
      ExplanationObject: this.parameters.ExplanationObject,
      EntityId: this.parameters.EntityId,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GetORReasonExplanationResponse;
  }
}
