import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the CalculatePrice message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CalculatePriceRequestParameters {
  Target: EntityReference | AnyEntityPayload;
  ParentId?: string;
}

/**
 * CalculatePrice request message
 *
 * Web API Action: CalculatePrice
 */
export class CalculatePriceRequest
  extends OrganizationRequest
  implements Executable<CalculatePriceResponse>
{
  declare readonly Parameters: Readonly<CalculatePriceRequestParameters>;

  constructor(parameters: CalculatePriceRequestParameters) {
    super("CalculatePrice", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CalculatePrice`;

    const body = requestBody({
      Target: this.Parameters.Target,
      ParentId: this.Parameters.ParentId,
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

  async parseResponse(response: Response): Promise<CalculatePriceResponse> {
    // No return value (204 No Content)
    return new CalculatePriceResponse();
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
