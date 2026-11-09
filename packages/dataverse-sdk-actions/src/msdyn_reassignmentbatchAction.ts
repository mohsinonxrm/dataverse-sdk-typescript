import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_reassignmentbatch action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_reassignmentbatchResponse = void;

/**
 * Parameters of the msdyn_reassignmentbatch action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_reassignmentbatchActionParameters {
  InputData: string;
}

/**
 * msdyn_reassignmentbatch action
 *
 * Unbound action
 */
export class msdyn_reassignmentbatchAction implements Executable<msdyn_reassignmentbatchResponse> {
  constructor(public readonly parameters: msdyn_reassignmentbatchActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_reassignmentbatch`;

    const body = requestBody({
      InputData: this.parameters.InputData,
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

  parseResponse(_response: Response): Promise<msdyn_reassignmentbatchResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
