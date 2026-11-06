import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsCreateWatchlist message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsCreateWatchlistRequestParameters {
  Description?: string;
  Name: string;
  SessionId?: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceBiometricsCreateWatchlist request message
 *
 * Web API Action: CCaaS_VoiceBiometricsCreateWatchlist
 */
export class CCaaS_VoiceBiometricsCreateWatchlistRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsCreateWatchlistResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsCreateWatchlistRequestParameters>;

  constructor(parameters: CCaaS_VoiceBiometricsCreateWatchlistRequestParameters) {
    super("CCaaS_VoiceBiometricsCreateWatchlist", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceBiometricsCreateWatchlist`;

    const body = requestBody({
      Description: this.Parameters.Description,
      Name: this.Parameters.Name,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsCreateWatchlistResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsCreateWatchlistResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsCreateWatchlist action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsCreateWatchlistResult {
  "@odata.context"?: string;
  BadRequestReason: string;
  ErrorMessage: string;
  StatusCode: string;
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsCreateWatchlist response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsCreateWatchlist action returns (see {@link CCaaS_VoiceBiometricsCreateWatchlistResult}).
 */
export class CCaaS_VoiceBiometricsCreateWatchlistResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsCreateWatchlistResult) {
    super("CCaaS_VoiceBiometricsCreateWatchlist");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsCreateWatchlistResponse {
    return new CCaaS_VoiceBiometricsCreateWatchlistResponse(
      data as CCaaS_VoiceBiometricsCreateWatchlistResult
    );
  }
}
