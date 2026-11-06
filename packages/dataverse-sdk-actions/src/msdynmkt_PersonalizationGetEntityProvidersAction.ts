import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_PersonalizationGetEntityProviders action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_PersonalizationGetEntityProvidersResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_PersonalizationGetEntityProvidersResponse;
  }
}
