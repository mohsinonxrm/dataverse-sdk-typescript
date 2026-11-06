import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { CreateRpaBoxResponse as CreateRpaBoxResponseData } from "./types/index.js";

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CreateRpaBoxResponse> {
    const data = await response.json();
    return CreateRpaBoxResponse.fromResponse(data);
  }
}

/**
 * CreateRpaBox response message
 */
export class CreateRpaBoxResponse extends OrganizationResponse {
  constructor(public result: CreateRpaBoxResponseData) {
    super("CreateRpaBox");
  }

  static fromResponse(data: unknown): CreateRpaBoxResponse {
    return new CreateRpaBoxResponse(responseObject<CreateRpaBoxResponseData>(data));
  }
}
