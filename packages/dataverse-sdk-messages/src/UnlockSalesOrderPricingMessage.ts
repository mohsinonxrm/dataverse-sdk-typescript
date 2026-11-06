import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the UnlockSalesOrderPricing message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface UnlockSalesOrderPricingRequestParameters {
  SalesOrderId: string;
}

/**
 * UnlockSalesOrderPricing request message
 *
 * Web API Action: UnlockSalesOrderPricing
 */
export class UnlockSalesOrderPricingRequest
  extends OrganizationRequest
  implements Executable<UnlockSalesOrderPricingResponse>
{
  declare readonly Parameters: Readonly<UnlockSalesOrderPricingRequestParameters>;

  constructor(parameters: UnlockSalesOrderPricingRequestParameters) {
    super("UnlockSalesOrderPricing", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/UnlockSalesOrderPricing`;

    const body = requestBody({
      SalesOrderId: this.Parameters.SalesOrderId,
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

  async parseResponse(response: Response): Promise<UnlockSalesOrderPricingResponse> {
    // No return value (204 No Content)
    return new UnlockSalesOrderPricingResponse();
  }
}

/**
 * UnlockSalesOrderPricing response message
 */
export class UnlockSalesOrderPricingResponse extends OrganizationResponse {
  constructor() {
    super("UnlockSalesOrderPricing");
  }

  static fromResponse(_data: unknown): UnlockSalesOrderPricingResponse {
    return new UnlockSalesOrderPricingResponse();
  }
}
