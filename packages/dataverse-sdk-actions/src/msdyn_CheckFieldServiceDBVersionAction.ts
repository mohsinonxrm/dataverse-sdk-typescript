import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CheckFieldServiceDBVersion action
 */
export interface msdyn_CheckFieldServiceDBVersionResponse {
  ReturnStatus: number;
  ResultEntities: string;
  Message: string;
  HelpLink: string;
}

/**
 * Parameters of the msdyn_CheckFieldServiceDBVersion action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CheckFieldServiceDBVersionActionParameters {
  ExpectedDBVersion: string;
}

/**
 * msdyn_CheckFieldServiceDBVersion action
 *
 * Unbound action
 */
export class msdyn_CheckFieldServiceDBVersionAction implements Executable<msdyn_CheckFieldServiceDBVersionResponse> {
  constructor(public readonly parameters: msdyn_CheckFieldServiceDBVersionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckFieldServiceDBVersion`;

    const body = requestBody({
      ExpectedDBVersion: this.parameters.ExpectedDBVersion,
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

  async parseResponse(response: Response): Promise<msdyn_CheckFieldServiceDBVersionResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_CheckFieldServiceDBVersionResponse;
    return (await response.json()) as msdyn_CheckFieldServiceDBVersionResponse;
  }
}
