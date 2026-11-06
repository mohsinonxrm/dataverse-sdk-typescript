import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * RecalculatePrice request message
 *
 * Web API Action: RecalculatePrice
 */
export class RecalculatePriceRequest
  extends OrganizationRequest
  implements Executable<RecalculatePriceResponse>
{
  constructor(
    public entityLogicalName: string,
    public entityId: string
  ) {
    super("RecalculatePrice");
  }

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
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<RecalculatePriceResponse> {
    // No return value (204 No Content)
    return new RecalculatePriceResponse();
  }
}

/**
 * RecalculatePrice response message
 */
export class RecalculatePriceResponse extends OrganizationResponse {
  constructor() {
    super("RecalculatePrice");
  }

  static fromResponse(_data: unknown): RecalculatePriceResponse {
    return new RecalculatePriceResponse();
  }
}
