import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsDeleteWatchlistResponse as CCaaS_VoiceBiometricsDeleteWatchlistResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsDeleteWatchlist message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsDeleteWatchlistRequestParameters {
  SessionId?: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceBiometricsDeleteWatchlist request message
 *
 * Web API Action: CCaaS_VoiceBiometricsDeleteWatchlist
 *
 * The first argument is the id of the msdyn_fraudsterdetectionwatchlist record to call it on.
 */
export class CCaaS_VoiceBiometricsDeleteWatchlistRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsDeleteWatchlistResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsDeleteWatchlistRequestParameters>;

  constructor(
    public msdyn_fraudsterdetectionwatchlistId: string,
    parameters: CCaaS_VoiceBiometricsDeleteWatchlistRequestParameters = {}
  ) {
    super("CCaaS_VoiceBiometricsDeleteWatchlist", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudsterdetectionwatchlists(${this.msdyn_fraudsterdetectionwatchlistId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsDeleteWatchlist`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      CorrelationId: this.Parameters.CorrelationId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsDeleteWatchlistResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_VoiceBiometricsDeleteWatchlistResponse.fromResponse({});
    return CCaaS_VoiceBiometricsDeleteWatchlistResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsDeleteWatchlist response message
 */
export class CCaaS_VoiceBiometricsDeleteWatchlistResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsDeleteWatchlistResponseData) {
    super("CCaaS_VoiceBiometricsDeleteWatchlist");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsDeleteWatchlistResponse {
    return new CCaaS_VoiceBiometricsDeleteWatchlistResponse(
      responseObject<CCaaS_VoiceBiometricsDeleteWatchlistResponseData>(data)
    );
  }
}
