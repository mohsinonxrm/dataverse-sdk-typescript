import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the RegisterFlowMachine message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RegisterFlowMachineRequestParameters {
  machineName: string;
  machineDescription?: string;
  machineCapacity: number;
  agentVersion: string;
  groupPublicKey: string;
  hostingType?: number;
  targetGroup?: EntityReference | AnyEntityPayload;
  pictureInPictureSupport?: number;
  machineDomain?: string;
}

/**
 * RegisterFlowMachine request message
 *
 * Web API Action: RegisterFlowMachine
 */
export class RegisterFlowMachineRequest
  extends OrganizationRequest
  implements Executable<RegisterFlowMachineResponse>
{
  declare readonly Parameters: Readonly<RegisterFlowMachineRequestParameters>;

  constructor(parameters: RegisterFlowMachineRequestParameters) {
    super("RegisterFlowMachine", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RegisterFlowMachine`;

    const body = requestBody({
      machineName: this.Parameters.machineName,
      machineDescription: this.Parameters.machineDescription,
      machineCapacity: this.Parameters.machineCapacity,
      agentVersion: this.Parameters.agentVersion,
      groupPublicKey: this.Parameters.groupPublicKey,
      hostingType: this.Parameters.hostingType,
      targetGroup: this.Parameters.targetGroup,
      pictureInPictureSupport: this.Parameters.pictureInPictureSupport,
      machineDomain: this.Parameters.machineDomain,
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

  async parseResponse(response: Response): Promise<RegisterFlowMachineResponse> {
    // The body is the complex value, with its @odata.context
    return RegisterFlowMachineResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the RegisterFlowMachine action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface RegisterFlowMachineResult {
  "@odata.context"?: string;
  groupId: string;
  machineId: string;
  relayListenKeys: string;
}

/**
 * RegisterFlowMachine response message
 *
 * `result` is the value the RegisterFlowMachine action returns (see {@link RegisterFlowMachineResult}).
 */
export class RegisterFlowMachineResponse extends OrganizationResponse {
  constructor(public result: RegisterFlowMachineResult) {
    super("RegisterFlowMachine");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): RegisterFlowMachineResponse {
    return new RegisterFlowMachineResponse(data as RegisterFlowMachineResult);
  }
}
