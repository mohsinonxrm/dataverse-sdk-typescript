import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_PersonalizationGetEntityAttributes action
 */
export interface msdynmkt_PersonalizationGetEntityAttributesResponse {
  GetEntityAttributesResult: string;
}

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityAttributes action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityAttributesActionParameters {
  GetEntityAttributesRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityAttributes action
 *
 * Unbound action
 */
export class msdynmkt_PersonalizationGetEntityAttributesAction implements Executable<msdynmkt_PersonalizationGetEntityAttributesResponse> {
  constructor(
    public readonly parameters: msdynmkt_PersonalizationGetEntityAttributesActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityAttributes`;

    const body = requestBody({
      GetEntityAttributesRequest: this.parameters.GetEntityAttributesRequest,
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
  ): Promise<msdynmkt_PersonalizationGetEntityAttributesResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_PersonalizationGetEntityAttributesResponse;
    return (await response.json()) as msdynmkt_PersonalizationGetEntityAttributesResponse;
  }
}
