import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CanBeReferenced action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CanBeReferencedResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CanBeReferencedResponse;
  }
}
