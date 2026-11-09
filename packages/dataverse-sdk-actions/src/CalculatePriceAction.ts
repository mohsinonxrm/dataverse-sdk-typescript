import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the CalculatePrice action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type CalculatePriceResponse = void;

/**
 * Parameters of the CalculatePrice action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CalculatePriceActionParameters {
  Target: EntityReference | AnyEntityPayload;
  ParentId?: string;
}

/**
 * CalculatePrice action
 *
 * Unbound action
 */
export class CalculatePriceAction implements Executable<CalculatePriceResponse> {
  constructor(public readonly parameters: CalculatePriceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CalculatePrice`;

    const body = requestBody({
      Target: this.parameters.Target,
      ParentId: this.parameters.ParentId,
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

  parseResponse(_response: Response): Promise<CalculatePriceResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
