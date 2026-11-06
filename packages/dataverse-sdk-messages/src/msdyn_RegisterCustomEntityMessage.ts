import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_RegisterCustomEntity request message
 *
 * Web API Action: msdyn_RegisterCustomEntity
 */
export class msdyn_RegisterCustomEntityRequest
  extends OrganizationRequest
  implements Executable<msdyn_RegisterCustomEntityResponse>
{
  constructor(
    public entityIds: string,
    public entityLogicalName: string,
    public deviceIds?: string,
    public names?: string,
    public accountIds?: string
  ) {
    super("msdyn_RegisterCustomEntity");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterCustomEntity`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      EntityLogicalName: this.entityLogicalName,
      DeviceIds: this.deviceIds,
      Names: this.names,
      AccountIds: this.accountIds,
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

  async parseResponse(response: Response): Promise<msdyn_RegisterCustomEntityResponse> {
    // No return value (204 No Content)
    return new msdyn_RegisterCustomEntityResponse();
  }
}

/**
 * msdyn_RegisterCustomEntity response message
 */
export class msdyn_RegisterCustomEntityResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_RegisterCustomEntity");
  }

  static fromResponse(_data: unknown): msdyn_RegisterCustomEntityResponse {
    return new msdyn_RegisterCustomEntityResponse();
  }
}
