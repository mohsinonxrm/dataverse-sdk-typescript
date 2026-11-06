import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_ProvisionCallbackAgentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_ProvisionCallbackAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_ProvisionCallbackAgentResult {
  "@odata.context"?: string;
  BotId: string;
}

/**
 * CCaaS_ProvisionCallbackAgent response message
 *
 * `result` is the value the CCaaS_ProvisionCallbackAgent action returns (see {@link CCaaS_ProvisionCallbackAgentResult}).
 */
export class CCaaS_ProvisionCallbackAgentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_ProvisionCallbackAgentResult) {
    super("CCaaS_ProvisionCallbackAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_ProvisionCallbackAgentResponse {
    return new CCaaS_ProvisionCallbackAgentResponse(data as CCaaS_ProvisionCallbackAgentResult);
  }
}
