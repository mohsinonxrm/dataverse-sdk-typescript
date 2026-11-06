import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAccountCatchup action
 */
export interface msdyn_SalesAccountCatchupResponse {
  msdyn_sales_copilot_output: string;
  msdyn_version: string;
  msdyn_summary: string;
  msdyn_summary_raw: string;
}

/**
 * msdyn_SalesAccountCatchup action
 *
 * Unbound action
 */
export class msdyn_SalesAccountCatchupAction implements Executable<msdyn_SalesAccountCatchupResponse> {
  constructor(
    public readonly msdyn_id: string,
    public readonly msdyn_sessionId?: string,
    public readonly msdyn_responseFormat?: string,
    public readonly msdyn_activityId?: string,
    public readonly msdyn_since?: string,
    public readonly msdyn_skipHeader?: string,
    public readonly msdyn_additionalParams?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAccountCatchup`;

    const body: Record<string, unknown> = {
      msdyn_id: this.msdyn_id,
      msdyn_sessionId: this.msdyn_sessionId,
      msdyn_responseFormat: this.msdyn_responseFormat,
      msdyn_activityId: this.msdyn_activityId,
      msdyn_since: this.msdyn_since,
      msdyn_skipHeader: this.msdyn_skipHeader,
      msdyn_additionalParams: this.msdyn_additionalParams,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAccountCatchupResponse> {
    const data = await response.json();
    return data as msdyn_SalesAccountCatchupResponse;
  }
}
