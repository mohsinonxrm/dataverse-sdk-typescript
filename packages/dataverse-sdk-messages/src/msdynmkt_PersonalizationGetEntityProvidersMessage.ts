import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_PersonalizationGetEntityProviders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PersonalizationGetEntityProvidersRequestParameters {
  GetProvidersRequest?: string;
}

/**
 * msdynmkt_PersonalizationGetEntityProviders request message
 *
 * Web API Action: msdynmkt_PersonalizationGetEntityProviders
 */
export class msdynmkt_PersonalizationGetEntityProvidersRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PersonalizationGetEntityProvidersResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PersonalizationGetEntityProvidersRequestParameters>;

  constructor(parameters: msdynmkt_PersonalizationGetEntityProvidersRequestParameters = {}) {
    super("msdynmkt_PersonalizationGetEntityProviders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PersonalizationGetEntityProviders`;

    const body = requestBody({
      GetProvidersRequest: this.Parameters.GetProvidersRequest,
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
    return msdynmkt_PersonalizationGetEntityProvidersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_PersonalizationGetEntityProviders action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_PersonalizationGetEntityProvidersResult {
  "@odata.context"?: string;
  GetProvidersResult: string;
}

/**
 * msdynmkt_PersonalizationGetEntityProviders response message
 *
 * `result` is the value the msdynmkt_PersonalizationGetEntityProviders action returns (see {@link msdynmkt_PersonalizationGetEntityProvidersResult}).
 */
export class msdynmkt_PersonalizationGetEntityProvidersResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_PersonalizationGetEntityProvidersResult) {
    super("msdynmkt_PersonalizationGetEntityProviders");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_PersonalizationGetEntityProvidersResponse {
    return new msdynmkt_PersonalizationGetEntityProvidersResponse(
      data as msdynmkt_PersonalizationGetEntityProvidersResult
    );
  }
}
