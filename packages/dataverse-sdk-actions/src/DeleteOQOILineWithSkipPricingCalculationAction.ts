import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from DeleteOQOILineWithSkipPricingCalculation action
 */
export interface DeleteOQOILineWithSkipPricingCalculationResponse {
  // No content returned
}

/**
 * Parameters of the DeleteOQOILineWithSkipPricingCalculation action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteOQOILineWithSkipPricingCalculationActionParameters {
  entityLogicalName: string;
  entityId: string;
}

/**
 * DeleteOQOILineWithSkipPricingCalculation action
 *
 * Unbound action
 */
export class DeleteOQOILineWithSkipPricingCalculationAction implements Executable<DeleteOQOILineWithSkipPricingCalculationResponse> {
  constructor(
    public readonly parameters: DeleteOQOILineWithSkipPricingCalculationActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOQOILineWithSkipPricingCalculation`;

    const body = requestBody({
      entityLogicalName: this.parameters.entityLogicalName,
      entityId: this.parameters.entityId,
    });

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(
    response: Response
  ): Promise<DeleteOQOILineWithSkipPricingCalculationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as DeleteOQOILineWithSkipPricingCalculationResponse;
  }
}
