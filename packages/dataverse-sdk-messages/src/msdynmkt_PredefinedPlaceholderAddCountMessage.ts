import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdynmkt_PredefinedPlaceholderAddCount message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdynmkt_PredefinedPlaceholderAddCountRequestParameters {
  PredefinedPlaceholderAddCountRequest?: string;
}

/**
 * msdynmkt_PredefinedPlaceholderAddCount request message
 *
 * Web API Action: msdynmkt_PredefinedPlaceholderAddCount
 */
export class msdynmkt_PredefinedPlaceholderAddCountRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PredefinedPlaceholderAddCountResponse>
{
  declare readonly Parameters: Readonly<msdynmkt_PredefinedPlaceholderAddCountRequestParameters>;

  constructor(parameters: msdynmkt_PredefinedPlaceholderAddCountRequestParameters = {}) {
    super("msdynmkt_PredefinedPlaceholderAddCount", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PredefinedPlaceholderAddCount`;

    const body = requestBody({
      PredefinedPlaceholderAddCountRequest: this.Parameters.PredefinedPlaceholderAddCountRequest,
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

  async parseResponse(response: Response): Promise<msdynmkt_PredefinedPlaceholderAddCountResponse> {
    // No return value (204 No Content)
    return new msdynmkt_PredefinedPlaceholderAddCountResponse();
  }
}

/**
 * msdynmkt_PredefinedPlaceholderAddCount response message
 */
export class msdynmkt_PredefinedPlaceholderAddCountResponse extends OrganizationResponse {
  constructor() {
    super("msdynmkt_PredefinedPlaceholderAddCount");
  }

  static fromResponse(_data: unknown): msdynmkt_PredefinedPlaceholderAddCountResponse {
    return new msdynmkt_PredefinedPlaceholderAddCountResponse();
  }
}
