import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_PersonalizationGetEntityAttributes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_PersonalizationGetEntityAttributesResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_PersonalizationGetEntityAttributesResponse;
  }
}
