import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_CapacityProfilesToUsers action
 */
export interface msdyn_CapacityProfilesToUsersResponse {
  // No content returned
}

/**
 * msdyn_CapacityProfilesToUsers action
 *
 * Unbound action
 */
export class msdyn_CapacityProfilesToUsersAction implements Executable<msdyn_CapacityProfilesToUsersResponse> {
  constructor(
    public readonly addedBookableResourceCapacityProfiles: Record<string, unknown>[],
    public readonly deletedBookableResourceCapacityProfiles: Record<string, unknown>[]
  ) {}

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
    return {};
  }
}
