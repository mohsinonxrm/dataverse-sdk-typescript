import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesLeadCatchup action
 */
export interface msdyn_SalesLeadCatchupResponse {
  msdyn_summary_raw: string;
  msdyn_summary: string;
  msdyn_version: string;
  msdyn_sales_copilot_output: string;
}

/**
 * msdyn_SalesLeadCatchup action
 *
 * Unbound action
 */
export class msdyn_SalesLeadCatchupAction implements Executable<msdyn_SalesLeadCatchupResponse> {
  constructor(
    public readonly msdyn_since: string | undefined,
    public readonly msdyn_sessionId: string | undefined,
    public readonly msdyn_responseFormat: string | undefined,
    public readonly msdyn_additionalParams: string | undefined,
    public readonly msdyn_activityId: string | undefined,
    public readonly msdyn_skipHeader: string | undefined,
    public readonly msdyn_id: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesLeadCatchup`;

    const body: Record<string, unknown> = {
      msdyn_since: this.msdyn_since,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_id: this.msdyn_id,
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

  async parseResponse(response: Response): Promise<msdyn_SalesLeadCatchupResponse> {
    const data = await response.json();
    return data as msdyn_SalesLeadCatchupResponse;
  }
}
