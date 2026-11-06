import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from PvaAuthorize action
 */
export interface PvaAuthorizeResponse {
  // No content returned
}

/**
 * Parameters of the PvaAuthorize action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaAuthorizeActionParameters {
  Users: Record<string, unknown>[];
  SharingRoleType: number;
  ShareOrUnshare: boolean;
}

/**
 * PvaAuthorize action
 *
 * Bound action
 * Binding parameter: entity (mscrm.bot)
 *
 * The first argument is the id of the bot record to call it on.
 */
export class PvaAuthorizeAction implements Executable<PvaAuthorizeResponse> {
  constructor(
    public readonly botId: string,
    public readonly parameters: PvaAuthorizeActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/bots(${this.botId})/Microsoft.Dynamics.CRM.PvaAuthorize`;

    const body = requestBody({
      Users: this.parameters.Users,
      SharingRoleType: this.parameters.SharingRoleType,
      ShareOrUnshare: this.parameters.ShareOrUnshare,
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

  async parseResponse(response: Response): Promise<PvaAuthorizeResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as PvaAuthorizeResponse;
    return (await response.json()) as PvaAuthorizeResponse;
  }
}
