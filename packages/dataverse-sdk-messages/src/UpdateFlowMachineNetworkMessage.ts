import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UpdateFlowMachineNetwork message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UpdateFlowMachineNetworkRequestParameters {
  description?: string;
  extendedproperties?: string;
  name?: string;
}

/**
 * UpdateFlowMachineNetwork request message
 *
 * Web API Action: UpdateFlowMachineNetwork
 *
 * The first argument is the id of the flowmachinenetwork record to call it on.
 */
export class UpdateFlowMachineNetworkRequest
  extends OrganizationRequest
  implements Executable<UpdateFlowMachineNetworkResponse>
{
  declare readonly Parameters: Readonly<UpdateFlowMachineNetworkRequestParameters>;

  constructor(
    public flowmachinenetworkId: string,
    parameters: UpdateFlowMachineNetworkRequestParameters = {}
  ) {
    super("UpdateFlowMachineNetwork", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/flowmachinenetworks(${this.flowmachinenetworkId})/Microsoft.Dynamics.CRM.UpdateFlowMachineNetwork`;

    const body = requestBody({
      description: this.Parameters.description,
      extendedproperties: this.Parameters.extendedproperties,
      name: this.Parameters.name,
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
    // No return value (204 No Content)
    return new UpdateFlowMachineNetworkResponse();
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
