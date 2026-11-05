import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * UpdateFlowMachineNetwork request message
 *
 * Web API Action: UpdateFlowMachineNetwork
 */
export class UpdateFlowMachineNetworkRequest
  extends OrganizationRequest
  implements Executable<UpdateFlowMachineNetworkResponse>
{
  constructor(
    public flowmachinenetworkId: string,
    public description: string,
    public extendedproperties: string,
    public name: string
  ) {
    super("UpdateFlowMachineNetwork");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinenetworks(${this.flowmachinenetworkId})/Microsoft.Dynamics.CRM.UpdateFlowMachineNetwork`;

    const body: Record<string, unknown> = {
      description: this.description,
      extendedproperties: this.extendedproperties,
      name: this.name,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<UpdateFlowMachineNetworkResponse> {
    // No return value (204 No Content)
    return new UpdateFlowMachineNetworkResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entity: this.flowmachinenetworkId,
      description: this.description,
      extendedproperties: this.extendedproperties,
      name: this.name,
    };
  }
}

/**
 * UpdateFlowMachineNetwork response message
 */
export class UpdateFlowMachineNetworkResponse extends OrganizationResponse {
  constructor() {
    super("UpdateFlowMachineNetwork");
  }

  static fromResponse(_data: unknown): UpdateFlowMachineNetworkResponse {
    return new UpdateFlowMachineNetworkResponse();
  }
}
