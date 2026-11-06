import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_IsCSEnterpriseLicensedUser function.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_IsCSEnterpriseLicensedUserResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_IsCSEnterpriseLicensedUserResponse;
  }
}
