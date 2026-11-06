import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_getsuppressionlistentriesResponse as msdynmkt_getsuppressionlistentriesResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdynmkt_getsuppressionlistentriesResponse.fromResponse({});
    return msdynmkt_getsuppressionlistentriesResponse.fromResponse(await response.json());
  }
}

/**
 * msdynmkt_getsuppressionlistentries response message
 */
export class msdynmkt_getsuppressionlistentriesResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_getsuppressionlistentriesResponseData) {
    super("msdynmkt_getsuppressionlistentries");
  }

  static fromResponse(data: unknown): msdynmkt_getsuppressionlistentriesResponse {
    return new msdynmkt_getsuppressionlistentriesResponse(
      responseObject<msdynmkt_getsuppressionlistentriesResponseData>(data)
    );
  }
}
