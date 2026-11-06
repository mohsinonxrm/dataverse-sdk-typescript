import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_ValidatePlaceholders action
 */
export interface msdynmkt_ValidatePlaceholdersResponse {
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_ValidatePlaceholdersResponse;
  }
}
