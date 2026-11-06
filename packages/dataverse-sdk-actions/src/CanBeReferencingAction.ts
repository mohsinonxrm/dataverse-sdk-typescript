import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CanBeReferencing action
 */
export interface CanBeReferencingResponse {
  CanBeReferencing: boolean;
}

/**
 * Parameters of the CanBeReferencing action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanBeReferencingActionParameters {
  EntityName: string;
}

/**
 * CanBeReferencing action
 *
 * Unbound action
 */
export class CanBeReferencingAction implements Executable<CanBeReferencingResponse> {
  constructor(public readonly parameters: CanBeReferencingActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferencing`;

    const body = requestBody({
      EntityName: this.parameters.EntityName,
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

  async parseResponse(response: Response): Promise<CanBeReferencingResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as CanBeReferencingResponse;
  }
}
