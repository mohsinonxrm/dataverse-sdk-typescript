import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { McpGetWorkIQTaskStatusResponse as McpGetWorkIQTaskStatusResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return McpGetWorkIQTaskStatusResponse.fromResponse({});
    return McpGetWorkIQTaskStatusResponse.fromResponse(await response.json());
  }
}

/**
 * McpGetWorkIQTaskStatus response message
 */
export class McpGetWorkIQTaskStatusResponse extends OrganizationResponse {
  constructor(public result: McpGetWorkIQTaskStatusResponseData) {
    super("McpGetWorkIQTaskStatus");
  }

  static fromResponse(data: unknown): McpGetWorkIQTaskStatusResponse {
    return new McpGetWorkIQTaskStatusResponse(
      responseObject<McpGetWorkIQTaskStatusResponseData>(data)
    );
  }
}
