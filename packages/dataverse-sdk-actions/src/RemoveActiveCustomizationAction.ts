import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RemoveActiveCustomization action
 */
export interface RemoveActiveCustomizationResponse {
  Success: boolean;
}

/**
 * Parameters of the RemoveActiveCustomization action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RemoveActiveCustomizationActionParameters {
  LogicalName: string;
  Id: string;
}

/**
 * RemoveActiveCustomization action
 *
 * Unbound action
 */
export class RemoveActiveCustomizationAction implements Executable<RemoveActiveCustomizationResponse> {
  constructor(public readonly parameters: RemoveActiveCustomizationActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RemoveActiveCustomization`;

    const body = requestBody({
      LogicalName: this.parameters.LogicalName,
      Id: this.parameters.Id,
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

  async parseResponse(response: Response): Promise<RemoveActiveCustomizationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RemoveActiveCustomizationResponse;
  }
}
