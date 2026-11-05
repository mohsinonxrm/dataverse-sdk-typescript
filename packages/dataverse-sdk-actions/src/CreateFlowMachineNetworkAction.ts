import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from CreateFlowMachineNetwork action
 */
export interface CreateFlowMachineNetworkResponse {
  flowmachinenetworkid: string;
}

/**
 * CreateFlowMachineNetwork action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.flowmachinenetwork))
 */
export class CreateFlowMachineNetworkAction implements Executable<CreateFlowMachineNetworkResponse> {
  constructor(
    public readonly subnet: string,
    public readonly type: string,
    public readonly extendedproperties: string,
    public readonly supportedscenario: string,
    public readonly name: string,
    public readonly description: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateFlowMachineNetwork`;

    const body: Record<string, unknown> = {
      subnet: this.subnet,
      type: this.type,
      extendedproperties: this.extendedproperties,
      supportedscenario: this.supportedscenario,
      name: this.name,
      description: this.description,
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

  async parseResponse(response: Response): Promise<CreateFlowMachineNetworkResponse> {
    const data = await response.json();
    return data as CreateFlowMachineNetworkResponse;
  }
}
