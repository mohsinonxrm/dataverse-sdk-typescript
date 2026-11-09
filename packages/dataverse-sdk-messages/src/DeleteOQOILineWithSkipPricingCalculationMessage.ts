import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the DeleteOQOILineWithSkipPricingCalculation message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface DeleteOQOILineWithSkipPricingCalculationRequestParameters {
  entityLogicalName: string;
  entityId: string;
}

/**
 * DeleteOQOILineWithSkipPricingCalculation request message
 *
 * Web API Action: DeleteOQOILineWithSkipPricingCalculation
 */
export class DeleteOQOILineWithSkipPricingCalculationRequest
  extends OrganizationRequest
  implements Executable<DeleteOQOILineWithSkipPricingCalculationResponse>
{
  declare readonly Parameters: Readonly<DeleteOQOILineWithSkipPricingCalculationRequestParameters>;

  constructor(parameters: DeleteOQOILineWithSkipPricingCalculationRequestParameters) {
    super("DeleteOQOILineWithSkipPricingCalculation", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/DeleteOQOILineWithSkipPricingCalculation`;

    const body = requestBody({
      entityLogicalName: this.Parameters.entityLogicalName,
      entityId: this.Parameters.entityId,
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

  parseResponse(_response: Response): Promise<DeleteOQOILineWithSkipPricingCalculationResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new DeleteOQOILineWithSkipPricingCalculationResponse());
  }
}

/**
 * DeleteOQOILineWithSkipPricingCalculation response message
 */
export class DeleteOQOILineWithSkipPricingCalculationResponse extends OrganizationResponse {
  constructor() {
    super("DeleteOQOILineWithSkipPricingCalculation");
  }

  static fromResponse(_data?: unknown): DeleteOQOILineWithSkipPricingCalculationResponse {
    return new DeleteOQOILineWithSkipPricingCalculationResponse();
  }
}
