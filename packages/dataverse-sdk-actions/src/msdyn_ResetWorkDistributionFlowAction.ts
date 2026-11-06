import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ResetWorkDistributionFlow action
 */
export interface msdyn_ResetWorkDistributionFlowResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_ResetWorkDistributionFlow action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResetWorkDistributionFlowActionParameters {
  ShouldMaintainCustomizations: boolean;
}

/**
 * msdyn_ResetWorkDistributionFlow action
 *
 * Unbound action
 */
export class msdyn_ResetWorkDistributionFlowAction implements Executable<msdyn_ResetWorkDistributionFlowResponse> {
  constructor(public readonly parameters: msdyn_ResetWorkDistributionFlowActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetWorkDistributionFlow`;

    const body = requestBody({
      ShouldMaintainCustomizations: this.parameters.ShouldMaintainCustomizations,
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

  async parseResponse(response: Response): Promise<msdyn_ResetWorkDistributionFlowResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ResetWorkDistributionFlowResponse;
    return (await response.json()) as msdyn_ResetWorkDistributionFlowResponse;
  }
}
