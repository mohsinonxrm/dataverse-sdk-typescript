import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_CapacityProfilesToUsers request message
 *
 * Web API Action: msdyn_CapacityProfilesToUsers
 */
export class msdyn_CapacityProfilesToUsersRequest
  extends OrganizationRequest
  implements Executable<msdyn_CapacityProfilesToUsersResponse>
{
  constructor(
    public addedBookableResourceCapacityProfiles?: Record<string, unknown>[],
    public deletedBookableResourceCapacityProfiles?: Record<string, unknown>[]
  ) {
    super("msdyn_CapacityProfilesToUsers");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CapacityProfilesToUsers`;

    const body: Record<string, unknown> = {
      AddedBookableResourceCapacityProfiles: this.addedBookableResourceCapacityProfiles,
      DeletedBookableResourceCapacityProfiles: this.deletedBookableResourceCapacityProfiles,
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

  async parseResponse(response: Response): Promise<msdyn_CapacityProfilesToUsersResponse> {
    // No return value (204 No Content)
    return new msdyn_CapacityProfilesToUsersResponse();
  }
}

/**
 * msdyn_CapacityProfilesToUsers response message
 */
export class msdyn_CapacityProfilesToUsersResponse extends OrganizationResponse {
  constructor() {
    super("msdyn_CapacityProfilesToUsers");
  }

  static fromResponse(_data: unknown): msdyn_CapacityProfilesToUsersResponse {
    return new msdyn_CapacityProfilesToUsersResponse();
  }
}
