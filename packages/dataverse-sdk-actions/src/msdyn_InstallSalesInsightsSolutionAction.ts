import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_InstallSalesInsightsSolution action
 */
export interface msdyn_InstallSalesInsightsSolutionResponse {
  SolutionInstallStatus: string;
}

/**
 * Parameters of the msdyn_InstallSalesInsightsSolution action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InstallSalesInsightsSolutionActionParameters {
  SolutionName: string;
  ForceInstall?: boolean;
}

/**
 * msdyn_InstallSalesInsightsSolution action
 *
 * Unbound action
 */
export class msdyn_InstallSalesInsightsSolutionAction implements Executable<msdyn_InstallSalesInsightsSolutionResponse> {
  constructor(public readonly parameters: msdyn_InstallSalesInsightsSolutionActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InstallSalesInsightsSolution`;

    const body = requestBody({
      SolutionName: this.parameters.SolutionName,
      ForceInstall: this.parameters.ForceInstall,
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

  async parseResponse(response: Response): Promise<msdyn_InstallSalesInsightsSolutionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_InstallSalesInsightsSolutionResponse;
  }
}
