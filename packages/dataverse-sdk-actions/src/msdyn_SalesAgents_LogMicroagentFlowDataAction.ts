import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_SalesAgents_LogMicroagentFlowData action
 */
export interface msdyn_SalesAgents_LogMicroagentFlowDataResponse {
  isSuccess: boolean;
  errorMessage: string;
}

/**
 * msdyn_SalesAgents_LogMicroagentFlowData action
 *
 * Unbound action
 */
export class msdyn_SalesAgents_LogMicroagentFlowDataAction implements Executable<msdyn_SalesAgents_LogMicroagentFlowDataResponse> {
  constructor(
    public readonly msdyn_salesagentrunid: string,
    public readonly msdyn_agenttype: number,
    public readonly msdyn_salesagenttype: number,
    public readonly trackingId: string,
    public readonly continueOnError: boolean,
    public readonly data: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SalesAgents_LogMicroagentFlowData`;

    const body: Record<string, unknown> = {
      msdyn_salesagentrunid: this.msdyn_salesagentrunid,
      msdyn_agenttype: this.msdyn_agenttype,
      msdyn_salesagenttype: this.msdyn_salesagenttype,
      trackingId: this.trackingId,
      continueOnError: this.continueOnError,
      data: this.data,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_SalesAgents_LogMicroagentFlowDataResponse> {
    const data = await response.json();
    return data as msdyn_SalesAgents_LogMicroagentFlowDataResponse;
  }
}
