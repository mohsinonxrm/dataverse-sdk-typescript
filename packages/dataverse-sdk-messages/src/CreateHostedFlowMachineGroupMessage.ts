import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { CreateHostedFlowMachineGroupResponse as CreateHostedFlowMachineGroupResponseData } from "./types/index.js";

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
    public groupImage: string | undefined,
    public groupCapacityCount: number | undefined,
    public groupDomainSetting: string | undefined,
    public groupDescription: string | undefined,
    public groupMachineNetworkId: EntityReference | AnyEntityPayload | undefined,
    public groupMaximumMachineCount: number | undefined,
    public groupName: string | undefined,
    public groupCredentials: string,
    public groupUsageType?: string,
    public groupManagedVersion?: string
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
}

/**
 * CreateHostedFlowMachineGroup response message
 */
export class CreateHostedFlowMachineGroupResponse extends OrganizationResponse {
  constructor(public result: CreateHostedFlowMachineGroupResponseData) {
    super("CreateHostedFlowMachineGroup");
  }

  static fromResponse(data: unknown): CreateHostedFlowMachineGroupResponse {
    return new CreateHostedFlowMachineGroupResponse(
      responseObject<CreateHostedFlowMachineGroupResponseData>(data)
    );
  }
}
