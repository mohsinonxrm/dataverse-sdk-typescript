import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { RegisterFlowMachineResponse as RegisterFlowMachineResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return RegisterFlowMachineResponse.fromResponse({});
    return RegisterFlowMachineResponse.fromResponse(await response.json());
  }
}

/**
 * RegisterFlowMachine response message
 */
export class RegisterFlowMachineResponse extends OrganizationResponse {
  constructor(public result: RegisterFlowMachineResponseData) {
    super("RegisterFlowMachine");
  }

  static fromResponse(data: unknown): RegisterFlowMachineResponse {
    return new RegisterFlowMachineResponse(responseObject<RegisterFlowMachineResponseData>(data));
  }
}
