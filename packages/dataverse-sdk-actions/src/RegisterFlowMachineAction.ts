import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from RegisterFlowMachine action
 */
export interface RegisterFlowMachineResponse {
  groupId: string;
  machineId: string;
  relayListenKeys: string;
}

/**
 * Parameters of the RegisterFlowMachine action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RegisterFlowMachineActionParameters {
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
 * RegisterFlowMachine action
 *
 * Unbound action
 */
export class RegisterFlowMachineAction implements Executable<RegisterFlowMachineResponse> {
  constructor(public readonly parameters: RegisterFlowMachineActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RegisterFlowMachine`;

    const body = requestBody({
      machineName: this.parameters.machineName,
      machineDescription: this.parameters.machineDescription,
      machineCapacity: this.parameters.machineCapacity,
      agentVersion: this.parameters.agentVersion,
      groupPublicKey: this.parameters.groupPublicKey,
      hostingType: this.parameters.hostingType,
      targetGroup: this.parameters.targetGroup,
      pictureInPictureSupport: this.parameters.pictureInPictureSupport,
      machineDomain: this.parameters.machineDomain,
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
    if (response.status === 204) return {} as RegisterFlowMachineResponse;
    return (await response.json()) as RegisterFlowMachineResponse;
  }
}
