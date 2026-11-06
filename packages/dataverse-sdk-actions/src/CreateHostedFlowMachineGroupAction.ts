import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

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
    public readonly groupImage: string | undefined,
    public readonly groupCapacityCount: number | undefined,
    public readonly groupDomainSetting: string | undefined,
    public readonly groupDescription: string | undefined,
    public readonly groupMachineNetworkId: EntityReference | AnyEntityPayload | undefined,
    public readonly groupMaximumMachineCount: number | undefined,
    public readonly groupName: string | undefined,
    public readonly groupCredentials: string,
    public readonly groupUsageType?: string,
    public readonly groupManagedVersion?: string
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
