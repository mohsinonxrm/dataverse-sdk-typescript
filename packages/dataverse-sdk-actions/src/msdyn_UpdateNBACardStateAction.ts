import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_UpdateNBACardState action
 */
export interface msdyn_UpdateNBACardStateResponse {
  // No content returned
}

/**
 * msdyn_UpdateNBACardState action
 *
 * Unbound action
 */
export class msdyn_UpdateNBACardStateAction implements Executable<msdyn_UpdateNBACardStateResponse> {
  constructor(
    public readonly msdyn_SnoozeTill: string | undefined,
    public readonly msdyn_OperationType: number,
    public readonly msdyn_NBAEntityLogicalName: string,
    public readonly msdyn_NBAEntityIds: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_UpdateNBACardState`;

    const body: Record<string, unknown> = {
      msdyn_SnoozeTill: this.msdyn_SnoozeTill,
      msdyn_OperationType: this.msdyn_OperationType,
      msdyn_NBAEntityLogicalName: this.msdyn_NBAEntityLogicalName,
      msdyn_NBAEntityIds: this.msdyn_NBAEntityIds,
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

  async parseResponse(response: Response): Promise<msdyn_UpdateNBACardStateResponse> {
    // No return value (204 No Content)
    return {};
  }
}
