import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { PvaGetUserBotsResponse as PvaGetUserBotsResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return PvaGetUserBotsResponse.fromResponse({});
    return PvaGetUserBotsResponse.fromResponse(await response.json());
  }
}

/**
 * PvaGetUserBots response message
 */
export class PvaGetUserBotsResponse extends OrganizationResponse {
  constructor(public result: PvaGetUserBotsResponseData) {
    super("PvaGetUserBots");
  }

  static fromResponse(data: unknown): PvaGetUserBotsResponse {
    return new PvaGetUserBotsResponse(responseObject<PvaGetUserBotsResponseData>(data));
  }
}
