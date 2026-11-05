import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdynmkt_DateTimeFormatOptionsResponse as msdynmkt_DateTimeFormatOptionsResponseData } from "./types/index.js";

/**
 * msdynmkt_DateTimeFormatOptions request message
 *
 * Web API Action: msdynmkt_DateTimeFormatOptions
 */
export class msdynmkt_DateTimeFormatOptionsRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_DateTimeFormatOptionsResponse>
{
  constructor(
    public msdynmkt_DateTimeRequestDateOnly: boolean,
    public msdynmkt_DateTimeRequestTimeZoneId: string,
    public msdynmkt_DateTimeRequestTimezoneIndepentent: boolean,
    public msdynmkt_DateTimeRequestDateOnlyV2: boolean,
    public msdynmkt_DateTimeRequestLCID: number,
    public msdynmkt_DateTimeRequestCultureName: string
  ) {
    super("msdynmkt_DateTimeFormatOptions");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_DateTimeFormatOptions`;

    const body: Record<string, unknown> = {
      msdynmkt_DateTimeRequestDateOnly: this.msdynmkt_DateTimeRequestDateOnly,
      msdynmkt_DateTimeRequestTimeZoneId: this.msdynmkt_DateTimeRequestTimeZoneId,
      msdynmkt_DateTimeRequestTimezoneIndepentent: this.msdynmkt_DateTimeRequestTimezoneIndepentent,
      msdynmkt_DateTimeRequestDateOnlyV2: this.msdynmkt_DateTimeRequestDateOnlyV2,
      msdynmkt_DateTimeRequestLCID: this.msdynmkt_DateTimeRequestLCID,
      msdynmkt_DateTimeRequestCultureName: this.msdynmkt_DateTimeRequestCultureName,
    };

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
    const data = await response.json();
    return msdynmkt_DateTimeFormatOptionsResponse.fromResponse(data);
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
