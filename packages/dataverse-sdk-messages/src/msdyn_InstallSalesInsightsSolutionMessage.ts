import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_InstallSalesInsightsSolution message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_InstallSalesInsightsSolutionRequestParameters {
  SolutionName: string;
  ForceInstall?: boolean;
}

/**
 * msdyn_InstallSalesInsightsSolution request message
 *
 * Web API Action: msdyn_InstallSalesInsightsSolution
 */
export class msdyn_InstallSalesInsightsSolutionRequest
  extends OrganizationRequest
  implements Executable<msdyn_InstallSalesInsightsSolutionResponse>
{
  declare readonly Parameters: Readonly<msdyn_InstallSalesInsightsSolutionRequestParameters>;

  constructor(parameters: msdyn_InstallSalesInsightsSolutionRequestParameters) {
    super("msdyn_InstallSalesInsightsSolution", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_InstallSalesInsightsSolution`;

    const body = requestBody({
      SolutionName: this.Parameters.SolutionName,
      ForceInstall: this.Parameters.ForceInstall,
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
    // The body is the complex value, with its @odata.context
    return msdyn_InstallSalesInsightsSolutionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_InstallSalesInsightsSolution action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_InstallSalesInsightsSolutionResult {
  "@odata.context"?: string;
  SolutionInstallStatus: string;
}

/**
 * msdyn_InstallSalesInsightsSolution response message
 *
 * `result` is the value the msdyn_InstallSalesInsightsSolution action returns (see {@link msdyn_InstallSalesInsightsSolutionResult}).
 */
export class msdyn_InstallSalesInsightsSolutionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InstallSalesInsightsSolutionResult) {
    super("msdyn_InstallSalesInsightsSolution");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_InstallSalesInsightsSolutionResponse {
    return new msdyn_InstallSalesInsightsSolutionResponse(
      data as msdyn_InstallSalesInsightsSolutionResult
    );
  }
}
