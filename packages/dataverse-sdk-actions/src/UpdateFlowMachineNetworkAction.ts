import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from UpdateFlowMachineNetwork action
 */
export interface UpdateFlowMachineNetworkResponse {
  // No content returned
}

/**
 * Parameters of the UpdateFlowMachineNetwork action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateFlowMachineNetworkActionParameters {
  description?: string;
  extendedproperties?: string;
  name?: string;
}

/**
 * UpdateFlowMachineNetwork action
 *
 * Bound action
 * Binding parameter: entity (mscrm.flowmachinenetwork)
 *
 * The first argument is the id of the flowmachinenetwork record to call it on.
 */
export class UpdateFlowMachineNetworkAction implements Executable<UpdateFlowMachineNetworkResponse> {
  constructor(
    public readonly flowmachinenetworkId: string,
    public readonly parameters: UpdateFlowMachineNetworkActionParameters = {}
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinenetworks(${this.flowmachinenetworkId})/Microsoft.Dynamics.CRM.UpdateFlowMachineNetwork`;

    const body = requestBody({
      description: this.parameters.description,
      extendedproperties: this.parameters.extendedproperties,
      name: this.parameters.name,
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

  async parseResponse(response: Response): Promise<UpdateFlowMachineNetworkResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as UpdateFlowMachineNetworkResponse;
  }
}
