import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_startSequenceStatsCopyJob action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_startSequenceStatsCopyJobResponse = void;

/**
 * Parameters of the msdyn_startSequenceStatsCopyJob action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_startSequenceStatsCopyJobActionParameters {
  InputData?: string;
}

/**
 * msdyn_startSequenceStatsCopyJob action
 *
 * Unbound action
 */
export class msdyn_startSequenceStatsCopyJobAction implements Executable<msdyn_startSequenceStatsCopyJobResponse> {
  constructor(public readonly parameters: msdyn_startSequenceStatsCopyJobActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_startSequenceStatsCopyJob`;

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

  parseResponse(_response: Response): Promise<msdyn_startSequenceStatsCopyJobResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
