import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_SendHeartbeatResponse as CCaaS_SendHeartbeatResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_SendHeartbeat message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_SendHeartbeatRequestParameters {
  ApiVersion: string;
  ClientSessionId: string;
}

/**
 * CCaaS_SendHeartbeat request message
 *
 * Web API Action: CCaaS_SendHeartbeat
 */
export class CCaaS_SendHeartbeatRequest
  extends OrganizationRequest
  implements Executable<CCaaS_SendHeartbeatResponse>
{
  declare readonly Parameters: Readonly<CCaaS_SendHeartbeatRequestParameters>;

  constructor(parameters: CCaaS_SendHeartbeatRequestParameters) {
    super("CCaaS_SendHeartbeat", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_SendHeartbeat`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      ClientSessionId: this.Parameters.ClientSessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_SendHeartbeatResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return CCaaS_SendHeartbeatResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * CCaaS_SendHeartbeat response message
 */
export class CCaaS_SendHeartbeatResponse extends OrganizationResponse {
  constructor(public result: CCaaS_SendHeartbeatResponseData) {
    super("CCaaS_SendHeartbeat");
  }

  static fromResponse(data: unknown): CCaaS_SendHeartbeatResponse {
    return new CCaaS_SendHeartbeatResponse(responseObject<CCaaS_SendHeartbeatResponseData>(data));
  }
}
