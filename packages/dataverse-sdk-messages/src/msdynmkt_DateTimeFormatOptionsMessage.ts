import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_DateTimeFormatOptions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_DateTimeFormatOptionsRequestParameters {
  msdynmkt_DateTimeRequestTimezoneIndepentent?: boolean;
  msdynmkt_DateTimeRequestTimeZoneId?: string;
  msdynmkt_DateTimeRequestLCID?: number;
  msdynmkt_DateTimeRequestDateOnly?: boolean;
  msdynmkt_DateTimeRequestDateOnlyV2?: boolean;
  msdynmkt_DateTimeRequestCultureName?: string;
}

/**
 * msdynmkt_DateTimeFormatOptions request message
 *
 * Web API Action: msdynmkt_DateTimeFormatOptions
 */
export class msdynmkt_DateTimeFormatOptionsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_DateTimeFormatOptionsResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_DateTimeFormatOptionsRequestParameters>;

  constructor(parameters: msdynmkt_DateTimeFormatOptionsRequestParameters = {}) {
    super("msdynmkt_DateTimeFormatOptions", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_DateTimeFormatOptions`;

    const body = requestBody({
      msdynmkt_DateTimeRequestTimezoneIndepentent:
        this.Parameters.msdynmkt_DateTimeRequestTimezoneIndepentent,
      msdynmkt_DateTimeRequestTimeZoneId: this.Parameters.msdynmkt_DateTimeRequestTimeZoneId,
      msdynmkt_DateTimeRequestLCID: this.Parameters.msdynmkt_DateTimeRequestLCID,
      msdynmkt_DateTimeRequestDateOnly: this.Parameters.msdynmkt_DateTimeRequestDateOnly,
      msdynmkt_DateTimeRequestDateOnlyV2: this.Parameters.msdynmkt_DateTimeRequestDateOnlyV2,
      msdynmkt_DateTimeRequestCultureName: this.Parameters.msdynmkt_DateTimeRequestCultureName,
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

  async parseResponse(response: Response): Promise<msdynmkt_DateTimeFormatOptionsResponse> {
    // The body is the complex value, with its @odata.context
    return msdynmkt_DateTimeFormatOptionsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdynmkt_DateTimeFormatOptions action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_DateTimeFormatOptionsResult {
  "@odata.context"?: string;
  msdynmkt_DateTimeResponse: string;
}

/**
 * msdynmkt_DateTimeFormatOptions response message
 *
 * `result` is the value the msdynmkt_DateTimeFormatOptions action returns (see {@link msdynmkt_DateTimeFormatOptionsResult}).
 */
export class msdynmkt_DateTimeFormatOptionsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_DateTimeFormatOptionsResult) {
    super("msdynmkt_DateTimeFormatOptions");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdynmkt_DateTimeFormatOptionsResponse {
    return new msdynmkt_DateTimeFormatOptionsResponse(data as msdynmkt_DateTimeFormatOptionsResult);
  }
}
