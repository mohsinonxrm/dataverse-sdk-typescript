import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from ReactivateEntityKey action
 */
export interface ReactivateEntityKeyResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<ReactivateEntityKeyResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as ReactivateEntityKeyResponse;
    return (await response.json()) as ReactivateEntityKeyResponse;
  }
}
