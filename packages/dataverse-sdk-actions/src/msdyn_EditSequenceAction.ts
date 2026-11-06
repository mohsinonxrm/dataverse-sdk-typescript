import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_EditSequence action
 */
export interface msdyn_EditSequenceResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_EditSequenceResponse;
  }
}
