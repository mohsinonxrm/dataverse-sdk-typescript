import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * DeleteOQOILineWithSkipPricingCalculation request message
 *
 * Web API Action: DeleteOQOILineWithSkipPricingCalculation
 */
export class DeleteOQOILineWithSkipPricingCalculationRequest
  extends OrganizationRequest
  implements Executable<DeleteOQOILineWithSkipPricingCalculationResponse>
{
  constructor(
    public entityLogicalName: string,
    public entityId: string
  ) {
    super("DeleteOQOILineWithSkipPricingCalculation");
  }

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
    return new DeleteOQOILineWithSkipPricingCalculationResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      entityLogicalName: this.entityLogicalName,
      entityId: this.entityId,
    };
  }
}

/**
 * DeleteOQOILineWithSkipPricingCalculation response message
 */
export class DeleteOQOILineWithSkipPricingCalculationResponse extends OrganizationResponse {
  constructor() {
    super("DeleteOQOILineWithSkipPricingCalculation");
  }

  static fromResponse(_data: unknown): DeleteOQOILineWithSkipPricingCalculationResponse {
    return new DeleteOQOILineWithSkipPricingCalculationResponse();
  }
}
