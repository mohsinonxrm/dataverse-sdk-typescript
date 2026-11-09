import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_UpdateRITenantInfo message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_UpdateRITenantInfoRequestParameters {
  HubName?: string;
  PrimaryKey?: string;
}

/**
 * msdyn_UpdateRITenantInfo request message
 *
 * Web API Action: msdyn_UpdateRITenantInfo
 */
export class msdyn_UpdateRITenantInfoRequest
  extends OrganizationRequest
  implements Executable<msdyn_UpdateRITenantInfoResponse>
{
  declare readonly Parameters: Readonly<msdyn_UpdateRITenantInfoRequestParameters>;

  constructor(parameters: msdyn_UpdateRITenantInfoRequestParameters = {}) {
    super("msdyn_UpdateRITenantInfo", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateRITenantInfo`;

    const body = requestBody({
      HubName: this.Parameters.HubName,
      PrimaryKey: this.Parameters.PrimaryKey,
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

  parseResponse(_response: Response): Promise<msdyn_UpdateRITenantInfoResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_UpdateRITenantInfoResponse());
  }
}

/**
 * msdyn_UpdateRITenantInfo response message
 */
export class msdyn_UpdateRITenantInfoResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_UpdateRITenantInfo");
  }

  static fromResponse(_data?: unknown): msdyn_UpdateRITenantInfoResponse {
    return new msdyn_UpdateRITenantInfoResponse();
  }
}
