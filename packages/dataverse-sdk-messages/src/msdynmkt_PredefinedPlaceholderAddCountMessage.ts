import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdynmkt_PredefinedPlaceholderAddCount request message
 *
 * Web API Action: msdynmkt_PredefinedPlaceholderAddCount
 */
export class msdynmkt_PredefinedPlaceholderAddCountRequest
  extends OrganizationRequest
  implements Executable<msdynmkt_PredefinedPlaceholderAddCountResponse>
{
  constructor(public predefinedPlaceholderAddCountRequest?: string) {
    super("msdynmkt_PredefinedPlaceholderAddCount");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdynmkt_PredefinedPlaceholderAddCount`;

    const body: Record<string, unknown> = {
      PredefinedPlaceholderAddCountRequest: this.predefinedPlaceholderAddCountRequest,
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
