import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaPublish request message
 *
 * Web API Action: PvaPublish
 *
 * The first argument is the id of the bot record to call it on.
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
    const url = `${baseUrl}/bots(${odataLiteral.guid(this.botId)})/Microsoft.Dynamics.CRM.PvaPublish`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<PvaPublishResponse> {
    // The body is the complex value, with its @odata.context
    return PvaPublishResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PvaPublish action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaPublishResult {
  "@odata.context"?: string;
  PublishedBotContentId: string;
}

/**
 * PvaPublish response message
 *
 * `result` is the value the PvaPublish action returns (see {@link PvaPublishResult}).
 */
export class PvaPublishResponse extends OrganizationResponse {
  constructor(public result: PvaPublishResult) {
    super("PvaPublish");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PvaPublishResponse {
    return new PvaPublishResponse(data as PvaPublishResult);
  }
}
