import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_IsCSEnterpriseLicensedUser function
 */
export interface msdyn_IsCSEnterpriseLicensedUserResponse {
  hasEnterpriseLicense: boolean;
}

/**
 * msdyn_IsCSEnterpriseLicensedUser function
 *
 * Unbound function
 */
export class msdyn_IsCSEnterpriseLicensedUserFunction implements Executable<msdyn_IsCSEnterpriseLicensedUserResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/msdyn_IsCSEnterpriseLicensedUser`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IsCSEnterpriseLicensedUserResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IsCSEnterpriseLicensedUserResponse;
    return (await response.json()) as msdyn_IsCSEnterpriseLicensedUserResponse;
  }
}
