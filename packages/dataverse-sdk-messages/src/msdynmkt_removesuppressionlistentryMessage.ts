import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_removesuppressionlistentry message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_removesuppressionlistentryRequestParameters {
  msdynmkt_emailaddress: string;
}

/**
 * msdynmkt_removesuppressionlistentry request message
 *
 * Web API Action: msdynmkt_removesuppressionlistentry
 */
export class msdynmkt_removesuppressionlistentryRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_removesuppressionlistentryResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_removesuppressionlistentryRequestParameters>;

  constructor(parameters: msdynmkt_removesuppressionlistentryRequestParameters) {
    super("msdynmkt_removesuppressionlistentry", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_removesuppressionlistentry`;

    const body = requestBody({
      msdynmkt_emailaddress: this.Parameters.msdynmkt_emailaddress,
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

  async parseResponse(response: Response): Promise<msdynmkt_removesuppressionlistentryResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_removesuppressionlistentryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_removesuppressionlistentry action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_removesuppressionlistentryResult {
  "@odata.context"?: string;
  msdynmkt_removesuppressionlistentryresponse: string;
}

/**
 * msdynmkt_removesuppressionlistentry response message
 *
 * `result` is the value the msdynmkt_removesuppressionlistentry action returns (see {@link msdynmkt_removesuppressionlistentryResult}).
 */
export class msdynmkt_removesuppressionlistentryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_removesuppressionlistentryResult) {
    super("msdynmkt_removesuppressionlistentry");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_removesuppressionlistentryResponse {
    return new msdynmkt_removesuppressionlistentryResponse(
      data as msdynmkt_removesuppressionlistentryResult
    );
  }
}
