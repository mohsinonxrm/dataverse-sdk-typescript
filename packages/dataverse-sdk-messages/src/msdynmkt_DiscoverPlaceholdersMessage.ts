import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_DiscoverPlaceholders message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_DiscoverPlaceholdersRequestParameters {
  DiscoverPlaceholdersRequest?: string;
}

/**
 * msdynmkt_DiscoverPlaceholders request message
 *
 * Web API Action: msdynmkt_DiscoverPlaceholders
 */
export class msdynmkt_DiscoverPlaceholdersRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_DiscoverPlaceholdersResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_DiscoverPlaceholdersRequestParameters>;

  constructor(parameters: msdynmkt_DiscoverPlaceholdersRequestParameters = {}) {
    super("msdynmkt_DiscoverPlaceholders", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_DiscoverPlaceholders`;

    const body = requestBody({
      DiscoverPlaceholdersRequest: this.Parameters.DiscoverPlaceholdersRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_DiscoverPlaceholdersResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_DiscoverPlaceholdersResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_DiscoverPlaceholders action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_DiscoverPlaceholdersResult {
  "@odata.context"?: string;
  DiscoverPlaceholdersResult: string;
}

/**
 * msdynmkt_DiscoverPlaceholders response message
 *
 * `result` is the value the msdynmkt_DiscoverPlaceholders action returns (see {@link msdynmkt_DiscoverPlaceholdersResult}).
 */
export class msdynmkt_DiscoverPlaceholdersResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_DiscoverPlaceholdersResult) {
    super("msdynmkt_DiscoverPlaceholders");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_DiscoverPlaceholdersResponse {
    return new msdynmkt_DiscoverPlaceholdersResponse(data as msdynmkt_DiscoverPlaceholdersResult);
  }
}
