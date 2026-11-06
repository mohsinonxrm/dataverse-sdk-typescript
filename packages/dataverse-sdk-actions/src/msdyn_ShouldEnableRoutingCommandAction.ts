import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_ShouldEnableRoutingCommand action
 */
export interface msdyn_ShouldEnableRoutingCommandResponse {
  EnableRoutingCommand: boolean;
}

/**
 * Parameters of the msdyn_ShouldEnableRoutingCommand action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ShouldEnableRoutingCommandActionParameters {
  EntityLogicalName: string;
}

/**
 * msdyn_ShouldEnableRoutingCommand action
 *
 * Unbound action
 */
export class msdyn_ShouldEnableRoutingCommandAction implements Executable<msdyn_ShouldEnableRoutingCommandResponse> {
  constructor(public readonly parameters: msdyn_ShouldEnableRoutingCommandActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ShouldEnableRoutingCommand`;

    const body = requestBody({
      EntityLogicalName: this.parameters.EntityLogicalName,
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

  async parseResponse(response: Response): Promise<msdyn_ShouldEnableRoutingCommandResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ShouldEnableRoutingCommandResponse;
  }
}
