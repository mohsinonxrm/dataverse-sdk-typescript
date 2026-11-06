import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_BusinessClosureSave action
 */
export interface msdyn_BusinessClosureSaveResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdyn_BusinessClosureSaveResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_BusinessClosureSaveResponse;
  }
}
