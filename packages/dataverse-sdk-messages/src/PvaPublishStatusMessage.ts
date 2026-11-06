import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PvaPublishStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaPublishStatusRequestParameters {
  PublishBotJob: string;
}

/**
 * PvaPublishStatus request message
 *
 * Web API Action: PvaPublishStatus
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaPublishStatusRequest
  extends OrganizationRequest
  implements Executable<PvaPublishStatusResponse>
{
  declare readonly Parameters: Readonly<PvaPublishStatusRequestParameters>;

  constructor(
    public botId: string,
    parameters: PvaPublishStatusRequestParameters
  ) {
    super("PvaPublishStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaPublishStatus`;

    const body = requestBody({
      PublishBotJob: this.Parameters.PublishBotJob,
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

  async parseResponse(response: Response): Promise<PvaPublishStatusResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return PvaPublishStatusResponse.fromResponse({});
    return PvaPublishStatusResponse.fromResponse(await response.json());
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
