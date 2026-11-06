import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_InstallSalesInsightsSolutionResponse as msdyn_InstallSalesInsightsSolutionResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_InstallSalesInsightsSolutionResponse.fromResponse({});
    return msdyn_InstallSalesInsightsSolutionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_InstallSalesInsightsSolution response message
 */
export class msdyn_InstallSalesInsightsSolutionResponse extends OrganizationResponse {
  constructor(public result: msdyn_InstallSalesInsightsSolutionResponseData) {
    super("msdyn_InstallSalesInsightsSolution");
  }

  static fromResponse(data: unknown): msdyn_InstallSalesInsightsSolutionResponse {
    return new msdyn_InstallSalesInsightsSolutionResponse(
      responseObject<msdyn_InstallSalesInsightsSolutionResponseData>(data)
    );
  }
}
