import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the UpdateFlowMachineNetwork action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type UpdateFlowMachineNetworkResponse = void;

/**
 * Parameters of the UpdateFlowMachineNetwork action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateFlowMachineNetworkActionParameters {
  description?: string;
  name?: string;
  extendedproperties?: string;
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
      name: this.parameters.name,
      extendedproperties: this.parameters.extendedproperties,
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

  parseResponse(_response: Response): Promise<UpdateFlowMachineNetworkResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
