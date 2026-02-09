import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from DeleteOQOILineWithSkipPricingCalculation action
 */
export interface DeleteOQOILineWithSkipPricingCalculationResponse {
  // No content returned
}

/**
 * DeleteOQOILineWithSkipPricingCalculation action
 *
 * Unbound action
 */
export class DeleteOQOILineWithSkipPricingCalculationAction implements Executable<DeleteOQOILineWithSkipPricingCalculationResponse> {
  constructor(
    public readonly entityLogicalName: string,
    public readonly entityId: string
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOQOILineWithSkipPricingCalculation`;

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

  async parseResponse(
    response: Response
  ): Promise<DeleteOQOILineWithSkipPricingCalculationResponse> {
    // No return value (204 No Content)
    return {};
  }
}
