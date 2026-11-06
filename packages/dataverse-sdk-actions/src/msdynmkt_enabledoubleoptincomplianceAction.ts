import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_enabledoubleoptincompliance action
 */
export interface msdynmkt_enabledoubleoptincomplianceResponse {
  // No content returned
}

/**
 * Parameters of the msdynmkt_enabledoubleoptincompliance action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_enabledoubleoptincomplianceActionParameters {
  msdynmkt_complianceid: string;
}

/**
 * msdynmkt_enabledoubleoptincompliance action
 *
 * Unbound action
 */
export class msdynmkt_enabledoubleoptincomplianceAction implements Executable<msdynmkt_enabledoubleoptincomplianceResponse> {
  constructor(public readonly parameters: msdynmkt_enabledoubleoptincomplianceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_enabledoubleoptincompliance`;

    const body = requestBody({
      msdynmkt_complianceid: this.parameters.msdynmkt_complianceid,
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

  async parseResponse(response: Response): Promise<msdynmkt_enabledoubleoptincomplianceResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_enabledoubleoptincomplianceResponse;
  }
}
