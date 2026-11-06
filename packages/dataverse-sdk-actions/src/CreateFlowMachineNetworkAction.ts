import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CreateFlowMachineNetwork action
 */
export interface CreateFlowMachineNetworkResponse {
  flowmachinenetworkid: string;
}

/**
 * Parameters of the CreateFlowMachineNetwork action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateFlowMachineNetworkActionParameters {
  type: string;
  subnet: string;
  name: string;
  description?: string;
  supportedscenario: string;
  extendedproperties?: string;
}

/**
 * CreateFlowMachineNetwork action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.flowmachinenetwork))
 */
export class CreateFlowMachineNetworkAction implements Executable<CreateFlowMachineNetworkResponse> {
  constructor(public readonly parameters: CreateFlowMachineNetworkActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/flowmachinenetworks/Microsoft.Dynamics.CRM.CreateFlowMachineNetwork`;

    const body = requestBody({
      type: this.parameters.type,
      subnet: this.parameters.subnet,
      name: this.parameters.name,
      description: this.parameters.description,
      supportedscenario: this.parameters.supportedscenario,
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

  async parseResponse(response: Response): Promise<CreateFlowMachineNetworkResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CreateFlowMachineNetworkResponse;
    return (await response.json()) as CreateFlowMachineNetworkResponse;
  }
}
