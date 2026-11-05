import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_UpdateRITenantInfo request message
 *
 * Web API Action: msdyn_UpdateRITenantInfo
 */
export class msdyn_UpdateRITenantInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRITenantInfoResponse>
{
  constructor(
    public hubName: string,
    public primaryKey: string
  ) {
    super("msdyn_UpdateRITenantInfo");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRITenantInfo`;

    const body: Record<string, unknown> = {
      HubName: this.hubName,
      PrimaryKey: this.primaryKey,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateRITenantInfoResponse> {
    // No return value (204 No Content)
    return new msdyn_UpdateRITenantInfoResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      HubName: this.hubName,
      PrimaryKey: this.primaryKey,
    };
  }
}

/**
 * msdyn_UpdateRITenantInfo response message
 */
export class msdyn_UpdateRITenantInfoResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateRITenantInfo");
  }

  static fromResponse(_data: unknown): msdyn_UpdateRITenantInfoResponse {
    return new msdyn_UpdateRITenantInfoResponse();
  }
}
