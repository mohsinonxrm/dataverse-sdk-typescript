import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_NotifyAgent message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_NotifyAgentRequestParameters {
  AgentIds: string[];
  Message: string;
  ApiVersion: string;
  Title: string;
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
      AgentIds: this.Parameters.AgentIds,
      Message: this.Parameters.Message,
      ApiVersion: this.Parameters.ApiVersion,
      Title: this.Parameters.Title,
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
    // The body is the complex value, with its @odata.context
    return CCaaS_NotifyAgentResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_NotifyAgent action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_NotifyAgentResult {
  "@odata.context"?: string;
  BulkActionId: string;
}

/**
 * CCaaS_NotifyAgent response message
 *
 * `result` is the value the CCaaS_NotifyAgent action returns (see {@link CCaaS_NotifyAgentResult}).
 */
export class CCaaS_NotifyAgentResponse extends OrganizationResponse {
  constructor(public result: CCaaS_NotifyAgentResult) {
    super("CCaaS_NotifyAgent");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_NotifyAgentResponse {
    return new CCaaS_NotifyAgentResponse(data as CCaaS_NotifyAgentResult);
  }
}
