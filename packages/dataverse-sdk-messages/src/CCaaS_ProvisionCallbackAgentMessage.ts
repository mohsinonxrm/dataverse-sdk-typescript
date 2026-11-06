import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_ProvisionCallbackAgentResponse as CCaaS_ProvisionCallbackAgentResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_ProvisionCallbackAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_ProvisionCallbackAgentRequestParameters {
  ApiVersion: string;
}

/**
 * CCaaS_ProvisionCallbackAgent request message
 *
 * Web API Action: CCaaS_ProvisionCallbackAgent
 */
export class CCaaS_ProvisionCallbackAgentRequest
  extends OrganizationRequest
  implements Executable<CCaaS_ProvisionCallbackAgentResponse>
{
  declare readonly Parameters: Readonly<CCaaS_ProvisionCallbackAgentRequestParameters>;

  constructor(parameters: CCaaS_ProvisionCallbackAgentRequestParameters) {
    super("CCaaS_ProvisionCallbackAgent", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_ProvisionCallbackAgent`;

    const body = requestBody({
      ApiVersion: this.Parameters.ApiVersion,
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

  async parseResponse(response: Response): Promise<CCaaS_ProvisionCallbackAgentResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return CCaaS_ProvisionCallbackAgentResponse.fromResponse({});
    return CCaaS_ProvisionCallbackAgentResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_ProvisionCallbackAgent response message
 */
export class CCaaS_ProvisionCallbackAgentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_ProvisionCallbackAgentResponseData) {
    super("CCaaS_ProvisionCallbackAgent");
  }

  static fromResponse(data: unknown): CCaaS_ProvisionCallbackAgentResponse {
    return new CCaaS_ProvisionCallbackAgentResponse(
      responseObject<CCaaS_ProvisionCallbackAgentResponseData>(data)
    );
  }
}
