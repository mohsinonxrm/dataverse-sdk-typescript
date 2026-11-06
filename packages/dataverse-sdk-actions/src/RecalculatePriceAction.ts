import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from RecalculatePrice action
 */
export interface RecalculatePriceResponse {
  // No content returned
}

/**
 * Parameters of the RecalculatePrice action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RecalculatePriceActionParameters {
  entityLogicalName: string;
  entityId: string;
}

/**
 * RecalculatePrice action
 *
 * Unbound action
 */
export class RecalculatePriceAction implements Executable<RecalculatePriceResponse> {
  constructor(public readonly parameters: RecalculatePriceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RecalculatePrice`;

    const body = requestBody({
      entityLogicalName: this.parameters.entityLogicalName,
      entityId: this.parameters.entityId,
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

  async parseResponse(response: Response): Promise<RecalculatePriceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as RecalculatePriceResponse;
  }
}
