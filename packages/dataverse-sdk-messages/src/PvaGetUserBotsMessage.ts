import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the PvaGetUserBots message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface PvaGetUserBotsRequestParameters {
  RoleType: number;
}

/**
 * PvaGetUserBots request message
 *
 * Web API Action: PvaGetUserBots
 */
export class PvaGetUserBotsRequest
  extends OrganizationRequest
  implements Executable<PvaGetUserBotsResponse>
{
  declare readonly Parameters: Readonly<PvaGetUserBotsRequestParameters>;

  constructor(parameters: PvaGetUserBotsRequestParameters) {
    super("PvaGetUserBots", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/PvaGetUserBots`;

    const body = requestBody({
      RoleType: this.Parameters.RoleType,
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
    return PvaGetUserBotsResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the PvaGetUserBots action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface PvaGetUserBotsResult {
  "@odata.context"?: string;
  Bots: string;
}

/**
 * PvaGetUserBots response message
 *
 * `result` is the value the PvaGetUserBots action returns (see {@link PvaGetUserBotsResult}).
 */
export class PvaGetUserBotsResponse extends OrganizationResponse {
  constructor(public result: PvaGetUserBotsResult) {
    super("PvaGetUserBots");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): PvaGetUserBotsResponse {
    return new PvaGetUserBotsResponse(data as PvaGetUserBotsResult);
  }
}
