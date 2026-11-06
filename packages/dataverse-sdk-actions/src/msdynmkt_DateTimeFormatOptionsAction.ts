import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_DateTimeFormatOptions action
 */
export interface msdynmkt_DateTimeFormatOptionsResponse {
  msdynmkt_DateTimeResponse: string;
}

/**
 * msdynmkt_DateTimeFormatOptions action
 *
 * Unbound action
 */
export class msdynmkt_DateTimeFormatOptionsAction implements Executable<msdynmkt_DateTimeFormatOptionsResponse> {
  constructor(
    public readonly msdynmkt_DateTimeRequestDateOnly?: boolean,
    public readonly msdynmkt_DateTimeRequestTimeZoneId?: string,
    public readonly msdynmkt_DateTimeRequestTimezoneIndepentent?: boolean,
    public readonly msdynmkt_DateTimeRequestDateOnlyV2?: boolean,
    public readonly msdynmkt_DateTimeRequestLCID?: number,
    public readonly msdynmkt_DateTimeRequestCultureName?: string
  ) {}

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
    return data as msdynmkt_DateTimeFormatOptionsResponse;
  }
}
