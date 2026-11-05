import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from ReactivateEntityKey action
 */
export interface ReactivateEntityKeyResponse {
  // No content returned
}

/**
 * ReactivateEntityKey action
 *
 * Unbound action
 */
export class ReactivateEntityKeyAction implements Executable<ReactivateEntityKeyResponse> {
  constructor(
    public readonly entityKeyLogicalName: string,
    public readonly entityLogicalName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/ReactivateEntityKey`;

    const body: Record<string, unknown> = {
      EntityKeyLogicalName: this.entityKeyLogicalName,
      EntityLogicalName: this.entityLogicalName,
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

  async parseResponse(response: Response): Promise<ReactivateEntityKeyResponse> {
    // No return value (204 No Content)
    return {};
  }
}
