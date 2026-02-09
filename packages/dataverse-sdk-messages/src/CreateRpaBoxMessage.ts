import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * CreateRpaBox request message
 *
 * Web API Action: CreateRpaBox
 */
export class CreateRpaBoxRequest
  extends OrganizationRequest
  implements Executable<CreateRpaBoxResponse>
{
  constructor(
    public machineDescription: string,
    public machineNetworkId: EntityReference,
    public machineName: string,
    public machineImageVersionId: EntityReference
  ) {
    super("CreateRpaBox");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CreateRpaBox`;

    const body: Record<string, unknown> = {
      machineDescription: this.machineDescription,
      machineNetworkId: this.machineNetworkId,
      machineName: this.machineName,
      machineImageVersionId: this.machineImageVersionId,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateRpaBoxResponse> {
    const data = await response.json();
    return CreateRpaBoxResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      machineDescription: this.machineDescription,
      machineNetworkId: this.machineNetworkId,
      machineName: this.machineName,
      machineImageVersionId: this.machineImageVersionId,
    };
  }
}

/**
 * CreateRpaBox response message
 */
export class CreateRpaBoxResponse extends OrganizationResponse {
  constructor(public result: CreateRpaBoxResponse) {
    super("CreateRpaBox");
  }

  static fromResponse(data: unknown): CreateRpaBoxResponse {
    return new CreateRpaBoxResponse((data as any).value);
  }
}
