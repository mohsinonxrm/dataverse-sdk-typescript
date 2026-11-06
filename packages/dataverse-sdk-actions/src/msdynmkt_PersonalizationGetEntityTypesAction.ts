import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_PersonalizationGetEntityTypes action
 */
export interface msdynmkt_PersonalizationGetEntityTypesResponse {
  GetEntityTypesResult: string;
}

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityTypes action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityTypesActionParameters {
  GetEntityTypesRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityTypes action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationGetEntityTypesAction implements Executable<msdynmkt_PersonalizationGetEntityTypesResponse> {
  constructor(
    public readonly parameters: msdynmkt_PersonalizationGetEntityTypesActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityTypes`;

    const body = requestBody({
      GetEntityTypesRequest: this.parameters.GetEntityTypesRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PersonalizationGetEntityTypesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_PersonalizationGetEntityTypesResponse;
    return (await response.json()) as msdynmkt_PersonalizationGetEntityTypesResponse;
  }
}
