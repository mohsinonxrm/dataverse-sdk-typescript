import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CanBeReferenced action
 */
export interface CanBeReferencedResponse {
  CanBeReferenced: boolean;
}

/**
 * Parameters of the CanBeReferenced action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CanBeReferencedActionParameters {
  EntityName: string;
}

/**
 * CanBeReferenced action
 *
 * Unbound action
 */
export class CanBeReferencedAction implements Executable<CanBeReferencedResponse> {
  constructor(public readonly parameters: CanBeReferencedActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CanBeReferenced`;

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

  async parseResponse(response: Response): Promise<CanBeReferencedResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CanBeReferencedResponse;
    return (await response.json()) as CanBeReferencedResponse;
  }
}
