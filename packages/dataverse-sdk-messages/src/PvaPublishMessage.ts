import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { PvaPublishResponse as PvaPublishResponseData } from "./types/index.js";

/**
 * PvaPublish request message
 *
 * Web API Action: PvaPublish
 */
export class PvaPublishRequest
  extends OrganizationRequest
  implements Executable<PvaPublishResponse>
{
  constructor(public botId: string) {
    super("PvaPublish");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaPublish`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaPublishResponse> {
    const data = await response.json();
    return PvaPublishResponse.fromResponse(data);
  }
}

/**
 * PvaPublish response message
 */
export class PvaPublishResponse extends OrganizationResponse {
  constructor(public result: PvaPublishResponseData) {
    super("PvaPublish");
  }

  static fromResponse(data: unknown): PvaPublishResponse {
    return new PvaPublishResponse(responseObject<PvaPublishResponseData>(data));
  }
}
