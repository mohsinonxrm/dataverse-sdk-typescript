import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from CalculatePrice action
 */
export interface CalculatePriceResponse {
  // No content returned
}

/**
 * CalculatePrice action
 *
 * Unbound action
 */
export class CalculatePriceAction implements Executable<CalculatePriceResponse> {
  constructor(
    public readonly target: EntityReference,
    public readonly parentId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CalculatePrice`;

    const body: Record<string, unknown> = {
      Target: this.target,
      ParentId: this.parentId,
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

  async parseResponse(response: Response): Promise<CalculatePriceResponse> {
    // No return value (204 No Content)
    return {};
  }
}
