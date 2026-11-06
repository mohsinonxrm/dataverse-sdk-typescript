import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_ShouldEnableRoutingCommand action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_ShouldEnableRoutingCommandResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_ShouldEnableRoutingCommandResponse;
  }
}
