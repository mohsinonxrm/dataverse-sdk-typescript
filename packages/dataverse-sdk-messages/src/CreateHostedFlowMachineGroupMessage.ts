import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { CreateHostedFlowMachineGroupResponse as CreateHostedFlowMachineGroupResponseData } from "./types/index.js";

/**
 * Parameters of the CreateHostedFlowMachineGroup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateHostedFlowMachineGroupRequestParameters {
  groupImage?: string;
  groupCapacityCount?: number;
  groupDomainSetting?: string;
  groupDescription?: string;
  groupMachineNetworkId?: EntityReference | AnyEntityPayload;
  groupMaximumMachineCount?: number;
  groupName?: string;
  groupCredentials: string;
  groupUsageType?: string;
  groupManagedVersion?: string;
}

/**
 * CreateHostedFlowMachineGroup request message
 *
 * Web API Action: CreateHostedFlowMachineGroup
 */
export class CreateHostedFlowMachineGroupRequest
  extends OrganizationRequest
  implements Executable<CreateHostedFlowMachineGroupResponse>
{
  declare readonly Parameters: Readonly<CreateHostedFlowMachineGroupRequestParameters>;

  constructor(parameters: CreateHostedFlowMachineGroupRequestParameters) {
    super("CreateHostedFlowMachineGroup", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateHostedFlowMachineGroup`;

    const body = requestBody({
      groupImage: this.Parameters.groupImage,
      groupCapacityCount: this.Parameters.groupCapacityCount,
      groupDomainSetting: this.Parameters.groupDomainSetting,
      groupDescription: this.Parameters.groupDescription,
      groupMachineNetworkId: this.Parameters.groupMachineNetworkId,
      groupMaximumMachineCount: this.Parameters.groupMaximumMachineCount,
      groupName: this.Parameters.groupName,
      groupCredentials: this.Parameters.groupCredentials,
      groupUsageType: this.Parameters.groupUsageType,
      groupManagedVersion: this.Parameters.groupManagedVersion,
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

  async parseResponse(response: Response): Promise<CreateHostedFlowMachineGroupResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CreateHostedFlowMachineGroupResponse.fromResponse(text ? JSON.parse(text) : {});
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
