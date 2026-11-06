import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from WhoAmI function
 */
export interface WhoAmIResponse {
  BusinessUnitId: string;
  OrganizationId: string;
  UserId: string;
}

/**
 * WhoAmI function
 *
 * Unbound function
 */
export class WhoAmIFunction implements Executable<WhoAmIResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    let url = `${baseUrl}/WhoAmI`;

    return {
      method: "GET",
      url,
      headers: {
        Accept: "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<WhoAmIResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as WhoAmIResponse;
    return (await response.json()) as WhoAmIResponse;
  }
}
