import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from PvaGetUserBots action
 */
export interface PvaGetUserBotsResponse {
  Bots: string;
}

/**
 * PvaGetUserBots action
 *
 * Unbound action
 */
export class PvaGetUserBotsAction implements Executable<PvaGetUserBotsResponse> {
  constructor(public readonly roleType: number) {}

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
    return data as PvaGetUserBotsResponse;
  }
}
