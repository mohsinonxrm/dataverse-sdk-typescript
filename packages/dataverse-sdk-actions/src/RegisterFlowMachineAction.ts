import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
 * RegisterFlowMachine action
 *
 * Unbound action
 */
export class RegisterFlowMachineAction implements Executable<RegisterFlowMachineResponse> {
  constructor(
    public readonly machineName: string,
    public readonly machineDescription: string | undefined,
    public readonly machineCapacity: number,
    public readonly agentVersion: string,
    public readonly groupPublicKey: string,
    public readonly hostingType?: number,
    public readonly targetGroup?: EntityReference | AnyEntityPayload,
    public readonly pictureInPictureSupport?: number,
    public readonly machineDomain?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RegisterFlowMachine`;

    const body: Record<string, unknown> = {
      machineName: this.machineName,
      machineDescription: this.machineDescription,
      machineCapacity: this.machineCapacity,
      agentVersion: this.agentVersion,
      groupPublicKey: this.groupPublicKey,
      hostingType: this.hostingType,
      targetGroup: this.targetGroup,
      pictureInPictureSupport: this.pictureInPictureSupport,
      machineDomain: this.machineDomain,
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

  async parseResponse(response: Response): Promise<RegisterFlowMachineResponse> {
    const data = await response.json();
    return data as RegisterFlowMachineResponse;
  }
}
