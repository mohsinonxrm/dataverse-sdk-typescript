import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsDeleteWatchlistResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsDeleteWatchlist action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsDeleteWatchlistResult {
  "@odata.context"?: string;
  BadRequestReason: string;
  ErrorMessage: string;
  StatusCode: string;
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsDeleteWatchlist response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsDeleteWatchlist action returns (see {@link CCaaS_VoiceBiometricsDeleteWatchlistResult}).
 */
export class CCaaS_VoiceBiometricsDeleteWatchlistResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsDeleteWatchlistResult) {
    super("CCaaS_VoiceBiometricsDeleteWatchlist");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsDeleteWatchlistResponse {
    return new CCaaS_VoiceBiometricsDeleteWatchlistResponse(
      data as CCaaS_VoiceBiometricsDeleteWatchlistResult
    );
  }
}
