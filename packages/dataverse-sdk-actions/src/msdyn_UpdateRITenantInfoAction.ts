import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateRITenantInfo action
 */
export interface msdyn_UpdateRITenantInfoResponse {
  // No content returned
}

/**
 * msdyn_UpdateRITenantInfo action
 *
 * Unbound action
 */
export class msdyn_UpdateRITenantInfoAction implements Executable<msdyn_UpdateRITenantInfoResponse> {
  constructor(
    public readonly hubName: string,
    public readonly primaryKey: string
  ) {}

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
    return {};
  }
}
