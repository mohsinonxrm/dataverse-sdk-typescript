import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetSalesCopilotEmailInsights action
 */
export interface msdyn_GetSalesCopilotEmailInsightsResponse {}

/**
 * msdyn_GetSalesCopilotEmailInsights action
 *
 * Unbound action
 */
export class msdyn_GetSalesCopilotEmailInsightsAction implements Executable<msdyn_GetSalesCopilotEmailInsightsResponse> {
  constructor(
    public readonly msdyn_activityid: string,
    public readonly msdyn_regardinglogicalname: string,
    public readonly msdyn_internetmessageid: string,
    public readonly msdyn_regardingid: string,
    public readonly msdyn_messageid: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetSalesCopilotEmailInsights`;

    const body: Record<string, unknown> = {
      msdyn_activityid: this.msdyn_activityid,
      msdyn_regardinglogicalname: this.msdyn_regardinglogicalname,
      msdyn_internetmessageid: this.msdyn_internetmessageid,
      msdyn_regardingid: this.msdyn_regardingid,
      msdyn_messageid: this.msdyn_messageid,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_GetSalesCopilotEmailInsightsResponse> {
    const data = await response.json();
    return data as msdyn_GetSalesCopilotEmailInsightsResponse;
  }
}
