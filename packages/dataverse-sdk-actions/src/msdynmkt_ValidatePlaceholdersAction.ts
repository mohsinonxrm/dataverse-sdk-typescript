import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_ValidatePlaceholders action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_ValidatePlaceholdersResponse {
  "@odata.context"?: string;
  ValidatePlaceholdersResult: string;
}

/**
 * Parameters of the msdynmkt_ValidatePlaceholders action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_ValidatePlaceholdersActionParameters {
  ValidatePlaceholdersRequest?: string;
}

/**
 * msdynmkt_ValidatePlaceholders action
 *
 * Unbound action
 */
export class msdynmkt_ValidatePlaceholdersAction implements Executable<msdynmkt_ValidatePlaceholdersResponse> {
  constructor(public readonly parameters: msdynmkt_ValidatePlaceholdersActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_ValidatePlaceholders`;

    const body = requestBody({
      ValidatePlaceholdersRequest: this.parameters.ValidatePlaceholdersRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_ValidatePlaceholdersResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_ValidatePlaceholdersResponse;
  }
}
