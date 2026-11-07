import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the PvaGetUserBots action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaGetUserBotsResponse {
  "@odata.context"?: string;
  Bots: string;
}

/**
 * Parameters of the PvaGetUserBots action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaGetUserBotsActionParameters {
  RoleType: number;
}

/**
 * PvaGetUserBots action
 *
 * Unbound action
 */
export class PvaGetUserBotsAction implements Executable<PvaGetUserBotsResponse> {
  constructor(public readonly parameters: PvaGetUserBotsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaGetUserBots`;

    const body = requestBody({
      RoleType: this.parameters.RoleType,
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

  async parseResponse(response: Response): Promise<PvaGetUserBotsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as PvaGetUserBotsResponse;
  }
}
