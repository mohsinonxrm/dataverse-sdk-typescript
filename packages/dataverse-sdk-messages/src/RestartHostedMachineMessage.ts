import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

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
    const url = `${baseUrl}/flowmachines(${odataLiteral.guid(this.flowmachineId)})/Microsoft.Dynamics.CRM.RestartHostedMachine`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<RestartHostedMachineResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RestartHostedMachineResponse());
  }
}

/**
 * RestartHostedMachine response message
 */
export class RestartHostedMachineResponse extends OrganizationResponse {
  constructor() {
    super("RestartHostedMachine");
  }

  static fromResponse(_data?: unknown): RestartHostedMachineResponse {
    return new RestartHostedMachineResponse();
  }
}
