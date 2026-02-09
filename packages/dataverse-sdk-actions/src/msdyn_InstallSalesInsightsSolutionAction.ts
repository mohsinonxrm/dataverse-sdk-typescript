import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_InstallSalesInsightsSolution action
 */
export interface msdyn_InstallSalesInsightsSolutionResponse {
  SolutionInstallStatus: string;
}

/**
 * msdyn_InstallSalesInsightsSolution action
 *
 * Unbound action
 */
export class msdyn_InstallSalesInsightsSolutionAction implements Executable<msdyn_InstallSalesInsightsSolutionResponse> {
  constructor(
    public readonly solutionName: string,
    public readonly forceInstall: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InstallSalesInsightsSolution`;

    const body: Record<string, unknown> = {
      SolutionName: this.solutionName,
      ForceInstall: this.forceInstall,
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

  async parseResponse(response: Response): Promise<msdyn_InstallSalesInsightsSolutionResponse> {
    const data = await response.json();
    return data as msdyn_InstallSalesInsightsSolutionResponse;
  }
}
