import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * LockSalesOrderPricing request message
 *
 * Web API Action: LockSalesOrderPricing
 *
 * The first argument is the id of the salesorder record to call it on.
 */
export class LockSalesOrderPricingRequest
  extends OrganizationRequest
  implements Executable<LockSalesOrderPricingResponse>
{
  constructor(public salesorderId: string) {
    super("LockSalesOrderPricing");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/salesorders(${this.salesorderId})/Microsoft.Dynamics.CRM.LockSalesOrderPricing`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<LockSalesOrderPricingResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new LockSalesOrderPricingResponse());
  }
}

/**
 * LockSalesOrderPricing response message
 */
export class LockSalesOrderPricingResponse extends OrganizationResponse {
  constructor() {
    super("LockSalesOrderPricing");
  }

  static fromResponse(_data?: unknown): LockSalesOrderPricingResponse {
    return new LockSalesOrderPricingResponse();
  }
}
