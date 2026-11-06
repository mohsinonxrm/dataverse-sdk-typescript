import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { RegisterFlowMachineResponse as RegisterFlowMachineResponseData } from "./types/index.js";

/**
 * RegisterFlowMachine request message
 *
 * Web API Action: RegisterFlowMachine
 */
export class RegisterFlowMachineRequest
  extends OrganizationRequest
  implements Executable<RegisterFlowMachineResponse>
{
  constructor(
    public machineName: string,
    public machineDescription: string | undefined,
    public machineCapacity: number,
    public agentVersion: string,
    public groupPublicKey: string,
    public hostingType?: number,
    public targetGroup?: EntityReference | AnyEntityPayload,
    public pictureInPictureSupport?: number,
    public machineDomain?: string
  ) {
    super("RegisterFlowMachine");
  }

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
    return RegisterFlowMachineResponse.fromResponse(data);
  }
}

/**
 * RegisterFlowMachine response message
 */
export class RegisterFlowMachineResponse extends OrganizationResponse {
  constructor(public result: RegisterFlowMachineResponseData) {
    super("RegisterFlowMachine");
  }

  static fromResponse(data: unknown): RegisterFlowMachineResponse {
    return new RegisterFlowMachineResponse(responseObject<RegisterFlowMachineResponseData>(data));
  }
}
