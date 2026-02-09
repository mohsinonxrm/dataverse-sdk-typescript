import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_ExtractAutoReplyInfo action
 */
export interface msdyn_SalesAgents_ExtractAutoReplyInfoResponse {
  msdyn_AutoReplyInfo: string;
}

/**
 * msdyn_SalesAgents_ExtractAutoReplyInfo action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_ExtractAutoReplyInfoAction implements Executable<msdyn_SalesAgents_ExtractAutoReplyInfoResponse> {
  constructor(
    public readonly msdyn_TrackingId: string,
    public readonly msdyn_SalesAgentRun: string,
    public readonly msdyn_AuthType: number,
    public readonly msdyn_SalesMacroAgentType: number,
    public readonly msdyn_Thread: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_ExtractAutoReplyInfo`;

    const body: Record<string, unknown> = {
      msdyn_TrackingId: this.msdyn_TrackingId,
      msdyn_SalesAgentRun: this.msdyn_SalesAgentRun,
      msdyn_AuthType: this.msdyn_AuthType,
      msdyn_SalesMacroAgentType: this.msdyn_SalesMacroAgentType,
      msdyn_Thread: this.msdyn_Thread,
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

  async parseResponse(response: Response): Promise<msdyn_SalesAgents_ExtractAutoReplyInfoResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_ExtractAutoReplyInfoResponse;
  }
}
