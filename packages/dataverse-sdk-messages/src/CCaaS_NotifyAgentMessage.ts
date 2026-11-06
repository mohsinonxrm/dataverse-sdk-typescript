import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_NotifyAgentResponse as CCaaS_NotifyAgentResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_NotifyAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_NotifyAgentRequestParameters {
  ApiVersion: string;
  Title: string;
  Message: string;
  AgentIds: string[];
}

/**
 * CCaaS_NotifyAgent request message
 *
 * Web API Action: CCaaS_NotifyAgent
 */
export class CCaaS_NotifyAgentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_NotifyAgentResponse>
{
  declare readonly Parameters: Readonly<CCaaS_NotifyAgentRequestParameters>;

  constructor(parameters: CCaaS_NotifyAgentRequestParameters) {
    super("CCaaS_NotifyAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_NotifyAgent`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
      Title: this.Parameters.Title,
      Message: this.Parameters.Message,
      AgentIds: this.Parameters.AgentIds,
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

  async parseResponse(response: Response): Promise<CCaaS_NotifyAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_NotifyAgentResponse.fromResponse({});
    return CCaaS_NotifyAgentResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_NotifyAgent response message
 */
export class CCaaS_NotifyAgentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_NotifyAgentResponseData) {
    super("CCaaS_NotifyAgent");
  }

  static fromResponse(data: unknown): CCaaS_NotifyAgentResponse {
    return new CCaaS_NotifyAgentResponse(responseObject<CCaaS_NotifyAgentResponseData>(data));
  }
}
