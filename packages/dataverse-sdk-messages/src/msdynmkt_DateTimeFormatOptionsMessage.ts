import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdynmkt_DateTimeFormatOptionsResponse as msdynmkt_DateTimeFormatOptionsResponseData } from "./types/index.js";

/**
 * Parameters of the msdynmkt_DateTimeFormatOptions message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_DateTimeFormatOptionsRequestParameters {
  msdynmkt_DateTimeRequestDateOnly?: boolean;
  msdynmkt_DateTimeRequestTimeZoneId?: string;
  msdynmkt_DateTimeRequestTimezoneIndepentent?: boolean;
  msdynmkt_DateTimeRequestDateOnlyV2?: boolean;
  msdynmkt_DateTimeRequestLCID?: number;
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
      msdynmkt_DateTimeRequestDateOnly: this.Parameters.msdynmkt_DateTimeRequestDateOnly,
      msdynmkt_DateTimeRequestTimeZoneId: this.Parameters.msdynmkt_DateTimeRequestTimeZoneId,
      msdynmkt_DateTimeRequestTimezoneIndepentent:
        this.Parameters.msdynmkt_DateTimeRequestTimezoneIndepentent,
      msdynmkt_DateTimeRequestDateOnlyV2: this.Parameters.msdynmkt_DateTimeRequestDateOnlyV2,
      msdynmkt_DateTimeRequestLCID: this.Parameters.msdynmkt_DateTimeRequestLCID,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return msdynmkt_DateTimeFormatOptionsResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * msdynmkt_DateTimeFormatOptions response message
 */
export class msdynmkt_DateTimeFormatOptionsResponse extends OrganizationResponse {
  constructor(public result: msdynmkt_DateTimeFormatOptionsResponseData) {
    super("msdynmkt_DateTimeFormatOptions");
  }

  static fromResponse(data: unknown): msdynmkt_DateTimeFormatOptionsResponse {
    return new msdynmkt_DateTimeFormatOptionsResponse(
      responseObject<msdynmkt_DateTimeFormatOptionsResponseData>(data)
    );
  }
}
