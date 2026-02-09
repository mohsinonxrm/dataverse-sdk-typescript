import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_InstallSalesInsightsSolution request message
 *
 * Web API Action: msdyn_InstallSalesInsightsSolution
 */
export class msdyn_InstallSalesInsightsSolutionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InstallSalesInsightsSolutionResponse>
{
  constructor(
    public solutionName: string,
    public forceInstall: boolean
  ) {
    super("msdyn_InstallSalesInsightsSolution");
  }

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
    return msdyn_InstallSalesInsightsSolutionResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SolutionName: this.solutionName,
      ForceInstall: this.forceInstall,
    };
  }
}

/**
 * msdyn_InstallSalesInsightsSolution response message
 */
export class msdyn_InstallSalesInsightsSolutionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InstallSalesInsightsSolutionResponse) {
    super("msdyn_InstallSalesInsightsSolution");
  }

  static fromResponse(data: unknown): msdyn_InstallSalesInsightsSolutionResponse {
    return new msdyn_InstallSalesInsightsSolutionResponse((data as any).value);
  }
}
