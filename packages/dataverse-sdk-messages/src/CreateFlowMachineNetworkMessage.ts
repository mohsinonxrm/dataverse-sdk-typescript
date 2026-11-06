import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CreateFlowMachineNetwork message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateFlowMachineNetworkRequestParameters {
  type: string;
  subnet: string;
  name: string;
  description?: string;
  supportedscenario: string;
  extendedproperties?: string;
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
      type: this.Parameters.type,
      subnet: this.Parameters.subnet,
      name: this.Parameters.name,
      description: this.Parameters.description,
      supportedscenario: this.Parameters.supportedscenario,
      extendedproperties: this.Parameters.extendedproperties,
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
    // The body is the complex value, with its @odata.context
    return CreateFlowMachineNetworkResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateFlowMachineNetwork action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateFlowMachineNetworkResult {
  "@odata.context"?: string;
  flowmachinenetworkid: string;
}

/**
 * CreateFlowMachineNetwork response message
 *
 * `result` is the value the CreateFlowMachineNetwork action returns (see {@link CreateFlowMachineNetworkResult}).
 */
export class CreateFlowMachineNetworkResponse extends OrganizationResponse {
  constructor(public result: CreateFlowMachineNetworkResult) {
    super("CreateFlowMachineNetwork");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateFlowMachineNetworkResponse {
    return new CreateFlowMachineNetworkResponse(data as CreateFlowMachineNetworkResult);
  }
}
