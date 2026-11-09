import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_SetLegalAcceptanceStatus action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_SetLegalAcceptanceStatusResponse = void;

/**
 * Parameters of the msdyn_SetLegalAcceptanceStatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SetLegalAcceptanceStatusActionParameters {
  Status: boolean;
}

/**
 * msdyn_SetLegalAcceptanceStatus action
 *
 * Unbound action
 */
export class msdyn_SetLegalAcceptanceStatusAction implements Executable<msdyn_SetLegalAcceptanceStatusResponse> {
  constructor(public readonly parameters: msdyn_SetLegalAcceptanceStatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SetLegalAcceptanceStatus`;

    const body = requestBody({
      Status: this.parameters.Status,
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

  parseResponse(_response: Response): Promise<msdyn_SetLegalAcceptanceStatusResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
