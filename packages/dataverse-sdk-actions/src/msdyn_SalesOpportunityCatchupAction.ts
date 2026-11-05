import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesOpportunityCatchup action
 */
export interface msdyn_SalesOpportunityCatchupResponse {
  msdyn_version: string;
  msdyn_summary: string;
  msdyn_sales_copilot_output: string;
  msdyn_summary_raw: string;
}

/**
 * msdyn_SalesOpportunityCatchup action
 *
 * Unbound action
 */
export class msdyn_SalesOpportunityCatchupAction implements Executable<msdyn_SalesOpportunityCatchupResponse> {
  constructor(
    public readonly msdyn_since: string,
    public readonly msdyn_responseFormat: string,
    public readonly msdyn_additionalParams: string,
    public readonly msdyn_sessionId: string,
    public readonly msdyn_activityId: string,
    public readonly msdyn_skipHeader: string,
    public readonly msdyn_id: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesOpportunityCatchup`;

    const body: Record<string, unknown> = {
      msdyn_since: this.msdyn_since,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_additionalParams: this.msdyn_additionalParams,
      msdyn_sessionId: this.msdyn_sessionId,
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

  async parseResponse(response: Response): Promise<msdyn_SalesOpportunityCatchupResponse> {
    const data = await response.json();
    return data as msdyn_SalesOpportunityCatchupResponse;
  }
}
