import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from UpdateFlowMachineNetwork action
 */
export interface UpdateFlowMachineNetworkResponse {
  // No content returned
}

/**
 * UpdateFlowMachineNetwork action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinenetwork)
 */
export class UpdateFlowMachineNetworkAction implements Executable<UpdateFlowMachineNetworkResponse> {
  constructor(
    public readonly flowmachinenetworkId: string,
    public readonly description: string,
    public readonly extendedproperties: string,
    public readonly name: string
  ) {}

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
    return {};
  }
}
