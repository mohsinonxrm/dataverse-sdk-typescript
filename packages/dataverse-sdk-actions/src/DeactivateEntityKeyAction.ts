import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeactivateEntityKey action
 */
export interface DeactivateEntityKeyResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<DeactivateEntityKeyResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeactivateEntityKeyResponse;
  }
}
