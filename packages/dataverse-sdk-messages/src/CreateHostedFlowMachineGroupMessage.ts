import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * CreateHostedFlowMachineGroup request message
 *
 * Web API Action: CreateHostedFlowMachineGroup
 */
export class CreateHostedFlowMachineGroupRequest
  extends OrganizationRequest
  implements Executable<CreateHostedFlowMachineGroupResponse>
{
  constructor(
    public groupImage: string,
    public groupCapacityCount: number,
    public groupDomainSetting: string,
    public groupDescription: string,
    public groupMachineNetworkId: EntityReference,
    public groupMaximumMachineCount: number,
    public groupName: string,
    public groupCredentials: string,
    public groupUsageType: string,
    public groupManagedVersion: string
  ) {
    super("CreateHostedFlowMachineGroup");
  }

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
    return CreateHostedFlowMachineGroupResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
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
  }
}

/**
 * CreateHostedFlowMachineGroup response message
 */
export class CreateHostedFlowMachineGroupResponse extends OrganizationResponse {
  constructor(public result: CreateHostedFlowMachineGroupResponse) {
    super("CreateHostedFlowMachineGroup");
  }

  static fromResponse(data: unknown): CreateHostedFlowMachineGroupResponse {
    return new CreateHostedFlowMachineGroupResponse((data as any).value);
  }
}
