import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdynmkt_doubleoptinstatus action
 */
export interface msdynmkt_doubleoptinstatusResponse {
  DOI_Job_Status_Response: string;
}

/**
 * Parameters of the msdynmkt_doubleoptinstatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_doubleoptinstatusActionParameters {
  msdynmkt_complianceid: string;
  DOI_Job_Status?: string;
}

/**
 * msdynmkt_doubleoptinstatus action
 *
 * Unbound action
 */
export class msdynmkt_doubleoptinstatusAction implements Executable<msdynmkt_doubleoptinstatusResponse> {
  constructor(public readonly parameters: msdynmkt_doubleoptinstatusActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_doubleoptinstatus`;

    const body = requestBody({
      msdynmkt_complianceid: this.parameters.msdynmkt_complianceid,
      DOI_Job_Status: this.parameters.DOI_Job_Status,
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

  async parseResponse(response: Response): Promise<msdynmkt_doubleoptinstatusResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdynmkt_doubleoptinstatusResponse;
  }
}
