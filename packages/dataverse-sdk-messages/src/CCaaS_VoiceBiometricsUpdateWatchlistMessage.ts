import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsUpdateWatchlistResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsUpdateWatchlist action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsUpdateWatchlistResult {
  "@odata.context"?: string;
  BadRequestReason: string;
  ErrorMessage: string;
  StatusCode: string;
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsUpdateWatchlist response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsUpdateWatchlist action returns (see {@link CCaaS_VoiceBiometricsUpdateWatchlistResult}).
 */
export class CCaaS_VoiceBiometricsUpdateWatchlistResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsUpdateWatchlistResult) {
    super("CCaaS_VoiceBiometricsUpdateWatchlist");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsUpdateWatchlistResponse {
    return new CCaaS_VoiceBiometricsUpdateWatchlistResponse(
      data as CCaaS_VoiceBiometricsUpdateWatchlistResult
    );
  }
}
