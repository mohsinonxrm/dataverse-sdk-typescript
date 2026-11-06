import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
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
    // 204 No Content is an empty result
    if (response.status === 204) return GetWorkIQTaskStatusResponse.fromResponse({});
    return GetWorkIQTaskStatusResponse.fromResponse(await response.json());
  }
}

/**
 * GetWorkIQTaskStatus response message
 */
export class GetWorkIQTaskStatusResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>) {
    super("GetWorkIQTaskStatus");
  }

  static fromResponse(data: unknown): GetWorkIQTaskStatusResponse {
    return new GetWorkIQTaskStatusResponse(responseObject<Record<string, unknown>>(data));
  }
}
