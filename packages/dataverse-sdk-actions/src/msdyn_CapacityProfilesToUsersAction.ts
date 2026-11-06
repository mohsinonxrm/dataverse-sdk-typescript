import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CapacityProfilesToUsers action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CapacityProfilesToUsersResponse = void;

/**
 * Parameters of the msdyn_CapacityProfilesToUsers action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CapacityProfilesToUsersActionParameters {
  AddedBookableResourceCapacityProfiles?: Record<string, unknown>[];
  DeletedBookableResourceCapacityProfiles?: Record<string, unknown>[];
}

/**
 * msdyn_CapacityProfilesToUsers action
 *
 * Unbound action
 */
export class msdyn_CapacityProfilesToUsersAction implements Executable<msdyn_CapacityProfilesToUsersResponse> {
  constructor(public readonly parameters: msdyn_CapacityProfilesToUsersActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CapacityProfilesToUsers`;

    const body = requestBody({
      AddedBookableResourceCapacityProfiles: this.parameters.AddedBookableResourceCapacityProfiles,
      DeletedBookableResourceCapacityProfiles:
        this.parameters.DeletedBookableResourceCapacityProfiles,
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
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
