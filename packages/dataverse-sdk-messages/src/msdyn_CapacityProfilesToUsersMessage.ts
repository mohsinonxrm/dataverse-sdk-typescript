import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_CapacityProfilesToUsers message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CapacityProfilesToUsersRequestParameters {
  AddedBookableResourceCapacityProfiles?: Record<string, unknown>[];
  DeletedBookableResourceCapacityProfiles?: Record<string, unknown>[];
}

/**
 * msdyn_CapacityProfilesToUsers request message
 *
 * Web API Action: msdyn_CapacityProfilesToUsers
 */
export class msdyn_CapacityProfilesToUsersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CapacityProfilesToUsersResponse>
{
  declare readonly Parameters: Readonly<msdyn_CapacityProfilesToUsersRequestParameters>;

  constructor(parameters: msdyn_CapacityProfilesToUsersRequestParameters = {}) {
    super("msdyn_CapacityProfilesToUsers", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CapacityProfilesToUsers`;

    const body = requestBody({
      AddedBookableResourceCapacityProfiles: this.Parameters.AddedBookableResourceCapacityProfiles,
      DeletedBookableResourceCapacityProfiles:
        this.Parameters.DeletedBookableResourceCapacityProfiles,
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

  parseResponse(_response: Response): Promise<msdyn_CapacityProfilesToUsersResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new msdyn_CapacityProfilesToUsersResponse());
  }
}

/**
 * msdyn_CapacityProfilesToUsers response message
 */
export class msdyn_CapacityProfilesToUsersResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CapacityProfilesToUsers");
  }

  static fromResponse(_data?: unknown): msdyn_CapacityProfilesToUsersResponse {
    return new msdyn_CapacityProfilesToUsersResponse();
  }
}
