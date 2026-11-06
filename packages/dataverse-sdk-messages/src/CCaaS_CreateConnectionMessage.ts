import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_CreateConnection message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_CreateConnectionRequestParameters {
  ClientSessionId: string;
  ApiVersion: string;
}

/**
 * CCaaS_CreateConnection request message
 *
 * Web API Action: CCaaS_CreateConnection
 */
export class CCaaS_CreateConnectionRequest
  extends OrganizationRequest
  implements Executable<CCaaS_CreateConnectionResponse>
{
  declare readonly Parameters: Readonly<CCaaS_CreateConnectionRequestParameters>;

  constructor(parameters: CCaaS_CreateConnectionRequestParameters) {
    super("CCaaS_CreateConnection", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_CreateConnection`;

    const body = requestBody({
      ClientSessionId: this.Parameters.ClientSessionId,
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

  async parseResponse(response: Response): Promise<CCaaS_CreateConnectionResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_CreateConnectionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_CreateConnection action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_CreateConnectionResult {
  "@odata.context"?: string;
  ActiveBrowserSessions: number;
  AgentId: string;
  AgentName: string;
  AllowedChannels: string[];
  CurrentPresenceStatusInfo: string;
  DisabledChannels: string[];
  PresenceId: string;
  Timestamp: number;
}

/**
 * CCaaS_CreateConnection response message
 *
 * `result` is the value the CCaaS_CreateConnection action returns (see {@link CCaaS_CreateConnectionResult}).
 */
export class CCaaS_CreateConnectionResponse extends OrganizationResponse {
  constructor(public result: CCaaS_CreateConnectionResult) {
    super("CCaaS_CreateConnection");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_CreateConnectionResponse {
    return new CCaaS_CreateConnectionResponse(data as CCaaS_CreateConnectionResult);
  }
}
