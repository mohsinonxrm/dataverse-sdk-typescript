import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the RecalculatePrice message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface RecalculatePriceRequestParameters {
  entityLogicalName: string;
  entityId: string;
}

/**
 * RecalculatePrice request message
 *
 * Web API Action: RecalculatePrice
 */
export class RecalculatePriceRequest
  extends OrganizationRequest
  implements Executable<RecalculatePriceResponse>
{
  declare readonly Parameters: Readonly<RecalculatePriceRequestParameters>;

  constructor(parameters: RecalculatePriceRequestParameters) {
    super("RecalculatePrice", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/RecalculatePrice`;

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

  parseResponse(_response: Response): Promise<RecalculatePriceResponse> {
    // No return value (204 No Content)
    return Promise.resolve(new RecalculatePriceResponse());
  }
}

/**
 * RecalculatePrice response message
 */
export class RecalculatePriceResponse extends OrganizationResponse {
  constructor() {
    super("RecalculatePrice");
  }

  static fromResponse(_data?: unknown): RecalculatePriceResponse {
    return new RecalculatePriceResponse();
  }
}
