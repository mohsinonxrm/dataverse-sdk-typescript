import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_getsuppressionlistentries message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_getsuppressionlistentriesRequestParameters {
  msdynmkt_getsuppressionlistentriesemailaddresses: string;
}

/**
 * msdynmkt_getsuppressionlistentries request message
 *
 * Web API Action: msdynmkt_getsuppressionlistentries
 */
export class msdynmkt_getsuppressionlistentriesRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_getsuppressionlistentriesResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_getsuppressionlistentriesRequestParameters>;

  constructor(parameters: msdynmkt_getsuppressionlistentriesRequestParameters) {
    super("msdynmkt_getsuppressionlistentries", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_getsuppressionlistentries`;

    const body = requestBody({
      msdynmkt_getsuppressionlistentriesemailaddresses:
        this.Parameters.msdynmkt_getsuppressionlistentriesemailaddresses,
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

  async parseResponse(response: Response): Promise<msdynmkt_getsuppressionlistentriesResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_getsuppressionlistentriesResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_getsuppressionlistentries action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_getsuppressionlistentriesResult {
  "@odata.context"?: string;
  msdynmkt_getsuppressionlistentriesresponse: string;
}

/**
 * msdynmkt_getsuppressionlistentries response message
 *
 * `result` is the value the msdynmkt_getsuppressionlistentries action returns (see {@link msdynmkt_getsuppressionlistentriesResult}).
 */
export class msdynmkt_getsuppressionlistentriesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getsuppressionlistentriesResult) {
    super("msdynmkt_getsuppressionlistentries");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_getsuppressionlistentriesResponse {
    return new msdynmkt_getsuppressionlistentriesResponse(
      data as msdynmkt_getsuppressionlistentriesResult
    );
  }
}
