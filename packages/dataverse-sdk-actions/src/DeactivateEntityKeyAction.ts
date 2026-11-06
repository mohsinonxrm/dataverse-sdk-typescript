import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the DeactivateEntityKey action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type DeactivateEntityKeyResponse = void;

/**
 * Parameters of the DeactivateEntityKey action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeactivateEntityKeyActionParameters {
  EntityKeyLogicalName: string;
  EntityLogicalName: string;
}

/**
 * DeactivateEntityKey action
 *
 * Unbound action
 */
export class DeactivateEntityKeyAction implements Executable<DeactivateEntityKeyResponse> {
  constructor(public readonly parameters: DeactivateEntityKeyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeactivateEntityKey`;

    const body = requestBody({
      EntityKeyLogicalName: this.parameters.EntityKeyLogicalName,
      EntityLogicalName: this.parameters.EntityLogicalName,
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

  parseResponse(_response: Response): Promise<DeactivateEntityKeyResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
