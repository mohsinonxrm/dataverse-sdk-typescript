import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_RegisterCustomEntity action
 */
export interface msdyn_RegisterCustomEntityResponse {
  // No content returned
}

/**
 * msdyn_RegisterCustomEntity action
 *
 * Unbound action
 */
export class msdyn_RegisterCustomEntityAction implements Executable<msdyn_RegisterCustomEntityResponse> {
  constructor(
    public readonly entityIds: string,
    public readonly entityLogicalName: string,
    public readonly deviceIds?: string,
    public readonly names?: string,
    public readonly accountIds?: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RegisterCustomEntity`;

    const body: Record<string, unknown> = {
      EntityIds: this.entityIds,
      EntityLogicalName: this.entityLogicalName,
      DeviceIds: this.deviceIds,
      Names: this.names,
      AccountIds: this.accountIds,
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

  async parseResponse(response: Response): Promise<msdyn_RegisterCustomEntityResponse> {
    // No return value (204 No Content)
    return {};
  }
}
