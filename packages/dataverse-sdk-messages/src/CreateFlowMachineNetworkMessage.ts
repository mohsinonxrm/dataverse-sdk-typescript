import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { CreateFlowMachineNetworkResponse as CreateFlowMachineNetworkResponseData } from "./types/index.js";

/**
 * CreateFlowMachineNetwork request message
 *
 * Web API Action: CreateFlowMachineNetwork
 */
export class CreateFlowMachineNetworkRequest
  extends OrganizationRequest
  implements Executable<CreateFlowMachineNetworkResponse>
{
  constructor(
    public subnet: string,
    public type: string,
    public extendedproperties: string | undefined,
    public supportedscenario: string,
    public name: string,
    public description?: string
  ) {
    super("CreateFlowMachineNetwork");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/flowmachinenetworks/Microsoft.Dynamics.CRM.CreateFlowMachineNetwork`;

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
    return CreateFlowMachineNetworkResponse.fromResponse(data);
  }
}

/**
 * CreateFlowMachineNetwork response message
 */
export class CreateFlowMachineNetworkResponse extends OrganizationResponse {
  constructor(public result: CreateFlowMachineNetworkResponseData) {
    super("CreateFlowMachineNetwork");
  }

  static fromResponse(data: unknown): CreateFlowMachineNetworkResponse {
    return new CreateFlowMachineNetworkResponse(
      responseObject<CreateFlowMachineNetworkResponseData>(data)
    );
  }
}
