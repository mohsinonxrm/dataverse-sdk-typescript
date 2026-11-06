import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_DateTimeFormatOptions action
 */
export interface msdynmkt_DateTimeFormatOptionsResponse {
  msdynmkt_DateTimeResponse: string;
}

/**
 * Parameters of the msdynmkt_DateTimeFormatOptions action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_DateTimeFormatOptionsActionParameters {
  msdynmkt_DateTimeRequestTimezoneIndepentent?: boolean;
  msdynmkt_DateTimeRequestTimeZoneId?: string;
  msdynmkt_DateTimeRequestLCID?: number;
  msdynmkt_DateTimeRequestDateOnly?: boolean;
  msdynmkt_DateTimeRequestDateOnlyV2?: boolean;
  msdynmkt_DateTimeRequestCultureName?: string;
}

/**
 * msdynmkt_DateTimeFormatOptions action
 *
 * Unbound action
 */
export class msdynmkt_DateTimeFormatOptionsAction implements Executable<msdynmkt_DateTimeFormatOptionsResponse> {
  constructor(public readonly parameters: msdynmkt_DateTimeFormatOptionsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_DateTimeFormatOptions`;

    const body = requestBody({
      msdynmkt_DateTimeRequestTimezoneIndepentent:
        this.parameters.msdynmkt_DateTimeRequestTimezoneIndepentent,
      msdynmkt_DateTimeRequestTimeZoneId: this.parameters.msdynmkt_DateTimeRequestTimeZoneId,
      msdynmkt_DateTimeRequestLCID: this.parameters.msdynmkt_DateTimeRequestLCID,
      msdynmkt_DateTimeRequestDateOnly: this.parameters.msdynmkt_DateTimeRequestDateOnly,
      msdynmkt_DateTimeRequestDateOnlyV2: this.parameters.msdynmkt_DateTimeRequestDateOnlyV2,
      msdynmkt_DateTimeRequestCultureName: this.parameters.msdynmkt_DateTimeRequestCultureName,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdynmkt_DateTimeFormatOptionsResponse;
    return (await response.json()) as msdynmkt_DateTimeFormatOptionsResponse;
  }
}
