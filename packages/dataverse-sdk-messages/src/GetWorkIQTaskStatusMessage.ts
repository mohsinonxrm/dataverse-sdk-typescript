import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the GetWorkIQTaskStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GetWorkIQTaskStatusRequestParameters {
  workspaceId: string;
  sessionId: string;
}

/**
 * GetWorkIQTaskStatus request message
 *
 * Web API Action: GetWorkIQTaskStatus
 */
export class GetWorkIQTaskStatusRequest
  extends OrganizationRequest
  implements Executable<GetWorkIQTaskStatusResponse>
{
  declare readonly Parameters: Readonly<GetWorkIQTaskStatusRequestParameters>;

  constructor(parameters: GetWorkIQTaskStatusRequestParameters) {
    super("GetWorkIQTaskStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GetWorkIQTaskStatus`;

    const body = requestBody({
      workspaceId: this.Parameters.workspaceId,
      sessionId: this.Parameters.sessionId,
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

  async parseResponse(response: Response): Promise<GetWorkIQTaskStatusResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return GetWorkIQTaskStatusResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return GetWorkIQTaskStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GetWorkIQTaskStatus action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GetWorkIQTaskStatusResult = {
  "@odata.context"?: string;
  "@odata.etag"?: string;
  "@odata.type"?: string;
  [column: string]: unknown;
} | null;

/**
 * GetWorkIQTaskStatus response message
 *
 * `result` is the value the GetWorkIQTaskStatus action returns (see {@link GetWorkIQTaskStatusResult}).
 */
export class GetWorkIQTaskStatusResponse extends OrganizationResponse {
  constructor(public result: GetWorkIQTaskStatusResult) {
    super("GetWorkIQTaskStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GetWorkIQTaskStatusResponse {
    return new GetWorkIQTaskStatusResponse((data ?? null) as GetWorkIQTaskStatusResult);
  }
}
