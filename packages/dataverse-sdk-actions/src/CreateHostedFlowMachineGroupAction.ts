import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from CreateHostedFlowMachineGroup action
 */
export interface CreateHostedFlowMachineGroupResponse {
  flowMachineGroupId: string;
  response: string;
}

/**
 * Parameters of the CreateHostedFlowMachineGroup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateHostedFlowMachineGroupActionParameters {
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
 * CreateHostedFlowMachineGroup action
 *
 * Unbound action
 */
export class CreateHostedFlowMachineGroupAction implements Executable<CreateHostedFlowMachineGroupResponse> {
  constructor(public readonly parameters: CreateHostedFlowMachineGroupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateHostedFlowMachineGroup`;

    const body = requestBody({
      groupImage: this.parameters.groupImage,
      groupCapacityCount: this.parameters.groupCapacityCount,
      groupDomainSetting: this.parameters.groupDomainSetting,
      groupDescription: this.parameters.groupDescription,
      groupMachineNetworkId: this.parameters.groupMachineNetworkId,
      groupMaximumMachineCount: this.parameters.groupMaximumMachineCount,
      groupName: this.parameters.groupName,
      groupCredentials: this.parameters.groupCredentials,
      groupUsageType: this.parameters.groupUsageType,
      groupManagedVersion: this.parameters.groupManagedVersion,
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
    return (text ? JSON.parse(text) : {}) as CreateHostedFlowMachineGroupResponse;
  }
}
