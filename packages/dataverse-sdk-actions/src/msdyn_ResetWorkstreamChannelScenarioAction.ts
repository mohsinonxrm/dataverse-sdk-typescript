import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ResetWorkstreamChannelScenario action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ResetWorkstreamChannelScenarioResponse = void;

/**
 * Parameters of the msdyn_ResetWorkstreamChannelScenario action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ResetWorkstreamChannelScenarioActionParameters {
  LiveWorkStreamId: string;
}

/**
 * msdyn_ResetWorkstreamChannelScenario action
 *
 * Unbound action
 */
export class msdyn_ResetWorkstreamChannelScenarioAction implements Executable<msdyn_ResetWorkstreamChannelScenarioResponse> {
  constructor(public readonly parameters: msdyn_ResetWorkstreamChannelScenarioActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ResetWorkstreamChannelScenario`;

    const body = requestBody({
      LiveWorkStreamId: this.parameters.LiveWorkStreamId,
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

  parseResponse(_response: Response): Promise<msdyn_ResetWorkstreamChannelScenarioResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
