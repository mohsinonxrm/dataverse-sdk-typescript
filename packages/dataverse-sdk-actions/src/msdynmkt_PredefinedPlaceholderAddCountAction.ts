import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_PredefinedPlaceholderAddCount action
 */
export interface msdynmkt_PredefinedPlaceholderAddCountResponse {
  // No content returned
}

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

  async parseResponse(response: Response): Promise<msdynmkt_PredefinedPlaceholderAddCountResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_PredefinedPlaceholderAddCountResponse;
    return (await response.json()) as msdynmkt_PredefinedPlaceholderAddCountResponse;
  }
}
