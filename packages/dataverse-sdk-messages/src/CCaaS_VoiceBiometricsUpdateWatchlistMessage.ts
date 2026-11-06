import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { CCaaS_VoiceBiometricsUpdateWatchlistResponse as CCaaS_VoiceBiometricsUpdateWatchlistResponseData } from "./types/index.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsUpdateWatchlist message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsUpdateWatchlistRequestParameters {
  SessionId?: string;
  Description?: string;
  CorrelationId?: string;
  Name?: string;
}

/**
 * CCaaS_VoiceBiometricsUpdateWatchlist request message
 *
 * Web API Action: CCaaS_VoiceBiometricsUpdateWatchlist
 *
 * The first argument is the id of the msdyn_fraudsterdetectionwatchlist record to call it on.
 */
export class CCaaS_VoiceBiometricsUpdateWatchlistRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsUpdateWatchlistResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsUpdateWatchlistRequestParameters>;

  constructor(
    public msdyn_fraudsterdetectionwatchlistId: string,
    parameters: CCaaS_VoiceBiometricsUpdateWatchlistRequestParameters = {}
  ) {
    super("CCaaS_VoiceBiometricsUpdateWatchlist", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudsterdetectionwatchlists(${this.msdyn_fraudsterdetectionwatchlistId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsUpdateWatchlist`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      Description: this.Parameters.Description,
      CorrelationId: this.Parameters.CorrelationId,
      Name: this.Parameters.Name,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsUpdateWatchlistResponse> {
    // 204 No Content is an empty result
    if (response.status === 204)
      return CCaaS_VoiceBiometricsUpdateWatchlistResponse.fromResponse({});
    return CCaaS_VoiceBiometricsUpdateWatchlistResponse.fromResponse(await response.json());
  }
}

/**
 * CCaaS_VoiceBiometricsUpdateWatchlist response message
 */
export class CCaaS_VoiceBiometricsUpdateWatchlistResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsUpdateWatchlistResponseData) {
    super("CCaaS_VoiceBiometricsUpdateWatchlist");
  }

  static fromResponse(data: unknown): CCaaS_VoiceBiometricsUpdateWatchlistResponse {
    return new CCaaS_VoiceBiometricsUpdateWatchlistResponse(
      responseObject<CCaaS_VoiceBiometricsUpdateWatchlistResponseData>(data)
    );
  }
}
