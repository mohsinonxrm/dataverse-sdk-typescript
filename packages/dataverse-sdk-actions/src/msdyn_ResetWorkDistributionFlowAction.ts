import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ResetWorkDistributionFlow action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ResetWorkDistributionFlowResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_ResetWorkDistributionFlowResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
