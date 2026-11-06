import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityTypes message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityTypesRequestParameters {
  GetEntityTypesRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityTypes request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityTypes
 */
export class msdynmkt_PersonalizationGetEntityTypesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityTypesResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationGetEntityTypesRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationGetEntityTypesRequestParameters = {}) {
    super("msdynmkt_PersonalizationGetEntityTypes", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityTypes`;

    const body = requestBody({
      GetEntityTypesRequest: this.Parameters.GetEntityTypesRequest,
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
    // The body is the complex value, with its @odata.context
    return msdynmkt_PersonalizationGetEntityTypesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_PersonalizationGetEntityTypes action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_PersonalizationGetEntityTypesResult {
  "@odata.context"?: string;
  GetEntityTypesResult: string;
}

/**
 * msdynmkt_PersonalizationGetEntityTypes response message
 *
 * `result` is the value the msdynmkt_PersonalizationGetEntityTypes action returns (see {@link msdynmkt_PersonalizationGetEntityTypesResult}).
 */
export class msdynmkt_PersonalizationGetEntityTypesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEntityTypesResult) {
    super("msdynmkt_PersonalizationGetEntityTypes");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEntityTypesResponse {
    return new msdynmkt_PersonalizationGetEntityTypesResponse(
      data as msdynmkt_PersonalizationGetEntityTypesResult
    );
  }
}
