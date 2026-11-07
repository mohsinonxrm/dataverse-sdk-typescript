import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the ReactivateEntityKey action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type ReactivateEntityKeyResponse = void;

/**
 * Parameters of the ReactivateEntityKey action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface ReactivateEntityKeyActionParameters {
  EntityKeyLogicalName: string;
  EntityLogicalName: string;
}

/**
 * ReactivateEntityKey action
 *
 * Unbound action
 */
export class ReactivateEntityKeyAction implements Executable<ReactivateEntityKeyResponse> {
  constructor(public readonly parameters: ReactivateEntityKeyActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReactivateEntityKey`;

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

  parseResponse(_response: Response): Promise<ReactivateEntityKeyResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
