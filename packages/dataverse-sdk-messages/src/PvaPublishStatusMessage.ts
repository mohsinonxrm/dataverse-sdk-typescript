import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import {
  odataLiteral,
  type Executable,
  type RequestInformation,
} from "@mohsinonxrm/dataverse-sdk-core";
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
    const url = `${baseUrl}/bots(${odataLiteral.guid(this.botId)})/Microsoft.Dynamics.CRM.PvaPublishStatus`;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return PvaPublishStatusResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return PvaPublishStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PvaPublishStatus action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type PvaPublishStatusResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * PvaPublishStatus response message
 *
 * `result` is the value the PvaPublishStatus action returns (see {@link PvaPublishStatusResult}).
 */
export class PvaPublishStatusResponse extends OrganizationResponse {
  constructor(public result: PvaPublishStatusResult) {
    super("PvaPublishStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PvaPublishStatusResponse {
    return new PvaPublishStatusResponse((data ?? null) as PvaPublishStatusResult);
  }
}
