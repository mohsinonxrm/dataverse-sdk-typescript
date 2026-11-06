import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsEnrollFraudster message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsEnrollFraudsterRequestParameters {
  SessionId?: string;
  FraudsterName: string;
  CorrelationId?: string;
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsEnrollFraudster request message
 *
 * Web API Action: CCaaS_VoiceBiometricsEnrollFraudster
 *
 * The first argument is the id of the msdyn_fraudresult record to call it on.
 */
export class CCaaS_VoiceBiometricsEnrollFraudsterRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsEnrollFraudsterResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsEnrollFraudsterRequestParameters>;

  constructor(
    public msdyn_fraudresultId: string,
    parameters: CCaaS_VoiceBiometricsEnrollFraudsterRequestParameters
  ) {
    super("CCaaS_VoiceBiometricsEnrollFraudster", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudresults(${this.msdyn_fraudresultId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsEnrollFraudster`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      FraudsterName: this.Parameters.FraudsterName,
      CorrelationId: this.Parameters.CorrelationId,
      WatchlistId: this.Parameters.WatchlistId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsEnrollFraudsterResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsEnrollFraudsterResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsEnrollFraudster action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsEnrollFraudsterResult {
  "@odata.context"?: string;
  BadRequestReason: string;
  ErrorMessage: string;
  FailureReason: string;
  FraudsterId: string;
  Outcome: string;
  StatusCode: string;
}

/**
 * CCaaS_VoiceBiometricsEnrollFraudster response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsEnrollFraudster action returns (see {@link CCaaS_VoiceBiometricsEnrollFraudsterResult}).
 */
export class CCaaS_VoiceBiometricsEnrollFraudsterResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsEnrollFraudsterResult) {
    super("CCaaS_VoiceBiometricsEnrollFraudster");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsEnrollFraudsterResponse {
    return new CCaaS_VoiceBiometricsEnrollFraudsterResponse(
      data as CCaaS_VoiceBiometricsEnrollFraudsterResult
    );
  }
}
