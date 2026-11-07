import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the CreateHostedFlowMachineGroup action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CreateHostedFlowMachineGroupResponse {
  "@odata.context"?: string;
  flowMachineGroupId: string;
  response: string;
}

/**
 * Parameters of the CreateHostedFlowMachineGroup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CreateHostedFlowMachineGroupActionParameters {
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
 * CreateHostedFlowMachineGroup action
 *
 * Unbound action
 */
export class CreateHostedFlowMachineGroupAction implements Executable<CreateHostedFlowMachineGroupResponse> {
  constructor(public readonly parameters: CreateHostedFlowMachineGroupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateHostedFlowMachineGroup`;

    const body = requestBody({
      groupUsageType: this.parameters.groupUsageType,
      groupName: this.parameters.groupName,
      groupCapacityCount: this.parameters.groupCapacityCount,
      groupDomainSetting: this.parameters.groupDomainSetting,
      groupImage: this.parameters.groupImage,
      groupManagedVersion: this.parameters.groupManagedVersion,
      groupDescription: this.parameters.groupDescription,
      groupCredentials: this.parameters.groupCredentials,
      groupMachineNetworkId: this.parameters.groupMachineNetworkId,
      groupMaximumMachineCount: this.parameters.groupMaximumMachineCount,
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
    return (await response.json()) as CreateHostedFlowMachineGroupResponse;
  }
}
