import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdynmkt_doubleoptinstatus action
 */
export interface msdynmkt_doubleoptinstatusResponse {
  DOI_Job_Status_Response: string;
}

/**
 * msdynmkt_doubleoptinstatus action
 *
 * Unbound action
 */
export class msdynmkt_doubleoptinstatusAction implements Executable<msdynmkt_doubleoptinstatusResponse> {
  constructor(
    public readonly msdynmkt_complianceid: string,
    public readonly dOI_Job_Status?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_doubleoptinstatus`;

    const body: Record<string, unknown> = {
      msdynmkt_complianceid: this.msdynmkt_complianceid,
      DOI_Job_Status: this.dOI_Job_Status,
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

  async parseResponse(response: Response): Promise<msdynmkt_doubleoptinstatusResponse> {
    const data = await response.json();
    return data as msdynmkt_doubleoptinstatusResponse;
  }
}
