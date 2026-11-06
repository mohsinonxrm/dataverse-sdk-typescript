import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdynmkt_doubleoptinstatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdynmkt_doubleoptinstatusResponse {
  "@odata.context"?: string;
  DOI_Job_Status_Response: string;
}

/**
 * Parameters of the msdynmkt_doubleoptinstatus action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_doubleoptinstatusActionParameters {
  DOI_Job_Status?: string;
  msdynmkt_complianceid: string;
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
      DOI_Job_Status: this.parameters.DOI_Job_Status,
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

  async parseResponse(response: Response): Promise<msdynmkt_doubleoptinstatusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdynmkt_doubleoptinstatusResponse;
  }
}
