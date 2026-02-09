import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeactivateEntityKey action
 */
export interface DeactivateEntityKeyResponse {
  // No content returned
}

/**
 * DeactivateEntityKey action
 *
 * Unbound action
 */
export class DeactivateEntityKeyAction implements Executable<DeactivateEntityKeyResponse> {
  constructor(
    public readonly entityKeyLogicalName: string,
    public readonly entityLogicalName: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeactivateEntityKey`;

    const body: Record<string, unknown> = {
      EntityKeyLogicalName: this.entityKeyLogicalName,
      EntityLogicalName: this.entityLogicalName,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<DeactivateEntityKeyResponse> {
    // No return value (204 No Content)
    return {};
  }
}
