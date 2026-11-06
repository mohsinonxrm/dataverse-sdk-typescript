import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityAttributes message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityAttributesRequestParameters {
  GetEntityAttributesRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityAttributes request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityAttributes
 */
export class msdynmkt_PersonalizationGetEntityAttributesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityAttributesResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationGetEntityAttributesRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationGetEntityAttributesRequestParameters = {}) {
    super("msdynmkt_PersonalizationGetEntityAttributes", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityAttributes`;

    const body = requestBody({
      GetEntityAttributesRequest: this.Parameters.GetEntityAttributesRequest,
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
    return msdynmkt_PersonalizationGetEntityAttributesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_PersonalizationGetEntityAttributes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_PersonalizationGetEntityAttributesResult {
  "@odata.context"?: string;
  GetEntityAttributesResult: string;
}

/**
 * msdynmkt_PersonalizationGetEntityAttributes response message
 *
 * `result` is the value the msdynmkt_PersonalizationGetEntityAttributes action returns (see {@link msdynmkt_PersonalizationGetEntityAttributesResult}).
 */
export class msdynmkt_PersonalizationGetEntityAttributesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEntityAttributesResult) {
    super("msdynmkt_PersonalizationGetEntityAttributes");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEntityAttributesResponse {
    return new msdynmkt_PersonalizationGetEntityAttributesResponse(
      data as msdynmkt_PersonalizationGetEntityAttributesResult
    );
  }
}
