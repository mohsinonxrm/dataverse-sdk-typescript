import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";

/**
 * PvaPublishStatus request message
 *
 * Web API Action: PvaPublishStatus
 */
export class PvaPublishStatusRequest
  extends OrganizationRequest
  implements Executable<PvaPublishStatusResponse>
{
  constructor(
    public botId: string,
    public publishBotJob: string
  ) {
    super("PvaPublishStatus");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaPublishStatus`;

    const body: Record<string, unknown> = {
      PublishBotJob: this.publishBotJob,
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

  async parseResponse(response: Response): Promise<PvaPublishStatusResponse> {
    const data = await response.json();
    return PvaPublishStatusResponse.fromResponse(data);
  }
}

/**
 * PvaPublishStatus response message
 */
export class PvaPublishStatusResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("PvaPublishStatus");
  }

  static fromResponse(data: unknown): PvaPublishStatusResponse {
    return new PvaPublishStatusResponse(responseObject<Record<string, unknown>>(data));
  }
}
