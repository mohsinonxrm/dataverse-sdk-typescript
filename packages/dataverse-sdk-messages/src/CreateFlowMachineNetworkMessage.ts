import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CreateFlowMachineNetworkResponse as CreateFlowMachineNetworkResponseData } from "./types/index.js";

/**
 * Parameters of the CreateFlowMachineNetwork message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateFlowMachineNetworkRequestParameters {
  subnet: string;
  type: string;
  extendedproperties?: string;
  supportedscenario: string;
  name: string;
  description?: string;
}

/**
 * CreateFlowMachineNetwork request message
 *
 * Web API Action: CreateFlowMachineNetwork
 */
export class CreateFlowMachineNetworkRequest
  extends OrganizationRequest
  implements Executable<CreateFlowMachineNetworkResponse>
{
  declare readonly Parameters: Readonly<CreateFlowMachineNetworkRequestParameters>;

  constructor(parameters: CreateFlowMachineNetworkRequestParameters) {
    super("CreateFlowMachineNetwork", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/flowmachinenetworks/Microsoft.Dynamics.CRM.CreateFlowMachineNetwork`;

    const body = requestBody({
      subnet: this.Parameters.subnet,
      type: this.Parameters.type,
      extendedproperties: this.Parameters.extendedproperties,
      supportedscenario: this.Parameters.supportedscenario,
      name: this.Parameters.name,
      description: this.Parameters.description,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreateFlowMachineNetworkResponse.fromResponse(text ? JSON.parse(text) : {});
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
