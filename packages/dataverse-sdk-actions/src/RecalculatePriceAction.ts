import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the RecalculatePrice action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type RecalculatePriceResponse = void;

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

  parseResponse(_response: Response): Promise<RecalculatePriceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
