import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from RecalculatePrice action
 */
export interface RecalculatePriceResponse {
  // No content returned
}

/**
 * RecalculatePrice action
 *
 * Unbound action
 */
export class RecalculatePriceAction implements Executable<RecalculatePriceResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly entityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RecalculatePrice`;

    const body: Record<string, unknown> = {
      entityLogicalName: this.entityLogicalName,
      entityId: this.entityId,
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

  async parseResponse(response: Response): Promise<RecalculatePriceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
