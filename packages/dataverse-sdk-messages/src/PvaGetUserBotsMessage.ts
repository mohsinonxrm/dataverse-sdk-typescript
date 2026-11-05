import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * PvaGetUserBots request message
 *
 * Web API Action: PvaGetUserBots
 */
export class PvaGetUserBotsRequest
  extends OrganizationRequest
  implements Executable<PvaGetUserBotsResponse>
{
  constructor(public roleType: number) {
    super("PvaGetUserBots");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaGetUserBots`;

    const body: Record<string, unknown> = {
      RoleType: this.roleType,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<PvaGetUserBotsResponse> {
    const data = await response.json();
    return PvaGetUserBotsResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      RoleType: this.roleType,
    };
  }
}

/**
 * PvaGetUserBots response message
 */
export class PvaGetUserBotsResponse extends OrganizationResponse {
  constructor(public result: PvaGetUserBotsResponse) {
    super("PvaGetUserBots");
  }

  static fromResponse(data: unknown): PvaGetUserBotsResponse {
    return new PvaGetUserBotsResponse((data as any).value);
  }
}
