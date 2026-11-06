import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CreateHostedFlowMachineGroup message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateHostedFlowMachineGroupRequestParameters {
  groupUsageType?: string;
  groupName?: string;
  groupCapacityCount?: number;
  groupDomainSetting?: string;
  groupImage?: string;
  groupManagedVersion?: string;
  groupDescription?: string;
  groupCredentials: string;
  groupMachineNetworkId?: EntityReference | AnyEntityPayload;
  groupMaximumMachineCount?: number;
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
      groupUsageType: this.Parameters.groupUsageType,
      groupName: this.Parameters.groupName,
      groupCapacityCount: this.Parameters.groupCapacityCount,
      groupDomainSetting: this.Parameters.groupDomainSetting,
      groupImage: this.Parameters.groupImage,
      groupManagedVersion: this.Parameters.groupManagedVersion,
      groupDescription: this.Parameters.groupDescription,
      groupCredentials: this.Parameters.groupCredentials,
      groupMachineNetworkId: this.Parameters.groupMachineNetworkId,
      groupMaximumMachineCount: this.Parameters.groupMaximumMachineCount,
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
    // The body is the complex value, with its @odata.context
    return CreateHostedFlowMachineGroupResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CreateHostedFlowMachineGroup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateHostedFlowMachineGroupResult {
  "@odata.context"?: string;
  flowMachineGroupId: string;
  response: string;
}

/**
 * CreateHostedFlowMachineGroup response message
 *
 * `result` is the value the CreateHostedFlowMachineGroup action returns (see {@link CreateHostedFlowMachineGroupResult}).
 */
export class CreateHostedFlowMachineGroupResponse extends OrganizationResponse {
  constructor(public result: CreateHostedFlowMachineGroupResult) {
    super("CreateHostedFlowMachineGroup");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CreateHostedFlowMachineGroupResponse {
    return new CreateHostedFlowMachineGroupResponse(data as CreateHostedFlowMachineGroupResult);
  }
}
