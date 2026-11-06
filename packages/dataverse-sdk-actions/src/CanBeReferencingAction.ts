import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CanBeReferencing action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CanBeReferencingResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CanBeReferencingResponse;
  }
}
