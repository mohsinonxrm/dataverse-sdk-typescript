import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_EditSequence action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_EditSequenceResponse {
  "@odata.context"?: string;
  DefinitionSequenceId: string;
}

/**
 * Parameters of the msdyn_EditSequence action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_EditSequenceActionParameters {
  SequenceId?: string;
  DiscardChanges?: boolean;
}

/**
 * msdyn_EditSequence action
 *
 * Unbound action
 */
export class msdyn_EditSequenceAction implements Executable<msdyn_EditSequenceResponse> {
  constructor(public readonly parameters: msdyn_EditSequenceActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_EditSequence`;

    const body = requestBody({
      SequenceId: this.parameters.SequenceId,
      DiscardChanges: this.parameters.DiscardChanges,
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

  async parseResponse(response: Response): Promise<msdyn_EditSequenceResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_EditSequenceResponse;
  }
}
