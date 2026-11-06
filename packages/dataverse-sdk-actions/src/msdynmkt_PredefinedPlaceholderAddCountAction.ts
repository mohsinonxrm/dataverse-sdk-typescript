import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_PredefinedPlaceholderAddCount action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdynmkt_PredefinedPlaceholderAddCountResponse = void;

/**
 * Parameters of the msdynmkt_PredefinedPlaceholderAddCount action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PredefinedPlaceholderAddCountActionParameters {
  PredefinedPlaceholderAddCountRequest?: string;
}

/**
 * msdynmkt_PredefinedPlaceholderAddCount action
 *
 * Unbound action
 */
export class msdynmkt_PredefinedPlaceholderAddCountAction implements Executable<msdynmkt_PredefinedPlaceholderAddCountResponse> {
  constructor(
    public readonly parameters: msdynmkt_PredefinedPlaceholderAddCountActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PredefinedPlaceholderAddCount`;

    const body = requestBody({
      PredefinedPlaceholderAddCountRequest: this.parameters.PredefinedPlaceholderAddCountRequest,
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

  parseResponse(_response: Response): Promise<msdynmkt_PredefinedPlaceholderAddCountResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
