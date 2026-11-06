import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_PersonalizationGetEntityProviders action
 */
export interface msdynmkt_PersonalizationGetEntityProvidersResponse {
  GetProvidersResult: string;
}

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityProviders action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityProvidersActionParameters {
  GetProvidersRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityProviders action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationGetEntityProvidersAction implements Executable<msdynmkt_PersonalizationGetEntityProvidersResponse> {
  constructor(
    public readonly parameters: msdynmkt_PersonalizationGetEntityProvidersActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityProviders`;

    const body = requestBody({
      GetProvidersRequest: this.parameters.GetProvidersRequest,
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

  async parseResponse(
    response: Response
  ): Promise<msdynmkt_PersonalizationGetEntityProvidersResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_PersonalizationGetEntityProvidersResponse;
    return (await response.json()) as msdynmkt_PersonalizationGetEntityProvidersResponse;
  }
}
