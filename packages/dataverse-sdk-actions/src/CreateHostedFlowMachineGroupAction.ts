import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CreateHostedFlowMachineGroup action
 */
export interface CreateHostedFlowMachineGroupResponse {
  flowMachineGroupId: string;
  response: string;
}

/**
 * CreateHostedFlowMachineGroup action
 *
 * Unbound action
 */
export class CreateHostedFlowMachineGroupAction implements Executable<CreateHostedFlowMachineGroupResponse> {
  constructor(
    public readonly groupImage: string,
    public readonly groupCapacityCount: number,
    public readonly groupDomainSetting: string,
    public readonly groupDescription: string,
    public readonly groupMachineNetworkId: EntityReference,
    public readonly groupMaximumMachineCount: number,
    public readonly groupName: string,
    public readonly groupCredentials: string,
    public readonly groupUsageType: string,
    public readonly groupManagedVersion: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateHostedFlowMachineGroup`;

    const body: Record<string, unknown> = {
      groupImage: this.groupImage,
      groupCapacityCount: this.groupCapacityCount,
      groupDomainSetting: this.groupDomainSetting,
      groupDescription: this.groupDescription,
      groupMachineNetworkId: this.groupMachineNetworkId,
      groupMaximumMachineCount: this.groupMaximumMachineCount,
      groupName: this.groupName,
      groupCredentials: this.groupCredentials,
      groupUsageType: this.groupUsageType,
      groupManagedVersion: this.groupManagedVersion,
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

  async parseResponse(response: Response): Promise<CreateHostedFlowMachineGroupResponse> {
    const data = await response.json();
    return data as CreateHostedFlowMachineGroupResponse;
  }
}
