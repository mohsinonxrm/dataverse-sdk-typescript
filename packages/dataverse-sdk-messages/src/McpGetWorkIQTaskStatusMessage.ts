import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the McpGetWorkIQTaskStatus message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface McpGetWorkIQTaskStatusRequestParameters {
  sessionId: string;
  workspaceId: string;
}

/**
 * McpGetWorkIQTaskStatus request message
 *
 * Web API Action: McpGetWorkIQTaskStatus
 */
export class McpGetWorkIQTaskStatusRequest
  extends OrganizationRequest
  implements Executable<McpGetWorkIQTaskStatusResponse>
{
  declare readonly Parameters: Readonly<McpGetWorkIQTaskStatusRequestParameters>;

  constructor(parameters: McpGetWorkIQTaskStatusRequestParameters) {
    super("McpGetWorkIQTaskStatus", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/McpGetWorkIQTaskStatus`;

    const body = requestBody({
      sessionId: this.Parameters.sessionId,
      workspaceId: this.Parameters.workspaceId,
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

  async parseResponse(response: Response): Promise<McpGetWorkIQTaskStatusResponse> {
    // The body is the complex value, with its @odata.context
    return McpGetWorkIQTaskStatusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the McpGetWorkIQTaskStatus action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface McpGetWorkIQTaskStatusResult {
  "@odata.context"?: string;
  results: string;
}

/**
 * McpGetWorkIQTaskStatus response message
 *
 * `result` is the value the McpGetWorkIQTaskStatus action returns (see {@link McpGetWorkIQTaskStatusResult}).
 */
export class McpGetWorkIQTaskStatusResponse extends OrganizationResponse {
  constructor(public result: McpGetWorkIQTaskStatusResult) {
    super("McpGetWorkIQTaskStatus");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): McpGetWorkIQTaskStatusResponse {
    return new McpGetWorkIQTaskStatusResponse(data as McpGetWorkIQTaskStatusResult);
  }
}
