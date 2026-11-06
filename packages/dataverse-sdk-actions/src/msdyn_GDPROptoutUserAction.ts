import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_GDPROptoutUser action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_GDPROptoutUserResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_GDPROptoutUserResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
