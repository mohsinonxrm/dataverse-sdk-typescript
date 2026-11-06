import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RestartHostedMachine request message
 *
 * Web API Action: RestartHostedMachine
 *
 * The first argument is the id of the flowmachine record to call it on.
 */
export class RestartHostedMachineRequest
  extends OrganizationRequest
  implements Executable<RestartHostedMachineResponse>
{
  constructor(public flowmachineId: string) {
    super("RestartHostedMachine");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachines(${this.flowmachineId})/Microsoft.Dynamics.CRM.RestartHostedMachine`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<RestartHostedMachineResponse> {
    // No return value (204 No Content)
    return new RestartHostedMachineResponse();
  }
}

/**
 * RestartHostedMachine response message
 */
export class RestartHostedMachineResponse extends OrganizationResponse {
  constructor() {
    super("RestartHostedMachine");
  }

  static fromResponse(_data: unknown): RestartHostedMachineResponse {
    return new RestartHostedMachineResponse();
  }
}
