import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_BusinessClosureSave action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_BusinessClosureSaveResponse = void;

/**
 * Parameters of the msdyn_BusinessClosureSave action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BusinessClosureSaveActionParameters {
  Id?: string;
  Name: string;
  Start: string;
  End: string;
}

/**
 * msdyn_BusinessClosureSave action
 *
 * Unbound action
 */
export class msdyn_BusinessClosureSaveAction implements Executable<msdyn_BusinessClosureSaveResponse> {
  constructor(public readonly parameters: msdyn_BusinessClosureSaveActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BusinessClosureSave`;

    const body = requestBody({
      Id: this.parameters.Id,
      Name: this.parameters.Name,
      Start: this.parameters.Start,
      End: this.parameters.End,
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

  parseResponse(_response: Response): Promise<msdyn_BusinessClosureSaveResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
