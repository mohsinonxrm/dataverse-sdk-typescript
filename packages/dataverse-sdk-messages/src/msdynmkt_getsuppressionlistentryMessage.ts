import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_getsuppressionlistentry message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getsuppressionlistentryRequestParameters {
  msdynmkt_emailaddress: string;
}

/**
 * msdynmkt_getsuppressionlistentry request message
 *
 * Web API Action: msdynmkt_getsuppressionlistentry
 */
export class msdynmkt_getsuppressionlistentryRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getsuppressionlistentryResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_getsuppressionlistentryRequestParameters>;

  constructor(parameters: msdynmkt_getsuppressionlistentryRequestParameters) {
    super("msdynmkt_getsuppressionlistentry", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentry`;

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

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentryResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_getsuppressionlistentryResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_getsuppressionlistentry action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getsuppressionlistentryResult {
  "@odata.context"?: string;
  msdynmkt_getsuppressionlistentryresponse: string;
}

/**
 * msdynmkt_getsuppressionlistentry response message
 *
 * `result` is the value the msdynmkt_getsuppressionlistentry action returns (see {@link msdynmkt_getsuppressionlistentryResult}).
 */
export class msdynmkt_getsuppressionlistentryResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getsuppressionlistentryResult) {
    super("msdynmkt_getsuppressionlistentry");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_getsuppressionlistentryResponse {
    return new msdynmkt_getsuppressionlistentryResponse(
      data as msdynmkt_getsuppressionlistentryResult
    );
  }
}
