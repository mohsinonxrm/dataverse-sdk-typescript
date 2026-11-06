import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GDPROptoutUser action
 */
export interface msdyn_GDPROptoutUserResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_GDPROptoutUser action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GDPROptoutUserActionParameters {
  optout: boolean;
}

/**
 * msdyn_GDPROptoutUser action
 *
 * Bound action
 * Binding parameter: entity (mscrm.systemuser)
 *
 * The first argument is the id of the systemuser record to call it on.
 */
export class msdyn_GDPROptoutUserAction implements Executable<msdyn_GDPROptoutUserResponse> {
  constructor(
    public readonly systemuserId: string,
    public readonly parameters: msdyn_GDPROptoutUserActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/systemusers(${this.systemuserId})/Microsoft.Dynamics.CRM.msdyn_GDPROptoutUser`;

    const body = requestBody({
      optout: this.parameters.optout,
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

  async parseResponse(response: Response): Promise<msdyn_GDPROptoutUserResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_GDPROptoutUserResponse;
  }
}
