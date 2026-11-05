import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * CalculatePrice request message
 *
 * Web API Action: CalculatePrice
 */
export class CalculatePriceRequest
  extends OrganizationRequest
  implements Executable<CalculatePriceResponse>
{
  constructor(
    public target: EntityReference,
    public parentId: string
  ) {
    super("CalculatePrice");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<CalculatePriceResponse> {
    // No return value (204 No Content)
    return new CalculatePriceResponse();
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Target: this.target,
      ParentId: this.parentId,
    };
  }
}

/**
 * CalculatePrice response message
 */
export class CalculatePriceResponse extends OrganizationResponse {
  constructor() {
    super("CalculatePrice");
  }

  static fromResponse(_data: unknown): CalculatePriceResponse {
    return new CalculatePriceResponse();
  }
}
