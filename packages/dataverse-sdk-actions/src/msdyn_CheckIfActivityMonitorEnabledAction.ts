import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CheckIfActivityMonitorEnabled action
 */
export interface msdyn_CheckIfActivityMonitorEnabledResponse {
  Message: string;
  ResultEntities: string;
  ReturnStatus: number;
  ReturnSeverity: number;
  ReturnLevel: number;
  HelpLink: string;
}

/**
 * msdyn_CheckIfActivityMonitorEnabled action
 *
 * Unbound action
 */
export class msdyn_CheckIfActivityMonitorEnabledAction implements Executable<msdyn_CheckIfActivityMonitorEnabledResponse> {
  constructor(public readonly solutionId: string) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CheckIfActivityMonitorEnabled`;

    const body: Record<string, unknown> = {
      SolutionId: this.solutionId,
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

  async parseResponse(response: Response): Promise<msdyn_CheckIfActivityMonitorEnabledResponse> {
    const data = await response.json();
    return data as msdyn_CheckIfActivityMonitorEnabledResponse;
  }
}
