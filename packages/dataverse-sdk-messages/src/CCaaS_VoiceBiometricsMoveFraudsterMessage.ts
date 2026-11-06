import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsMoveFraudster message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsMoveFraudsterRequestParameters {
  SessionId?: string;
  TargetWatchlistId: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceBiometricsMoveFraudster request message
 *
 * Web API Action: CCaaS_VoiceBiometricsMoveFraudster
 *
 * The first argument is the id of the msdyn_fraudsterdetectionvoiceprint record to call it on.
 */
export class CCaaS_VoiceBiometricsMoveFraudsterRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsMoveFraudsterResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsMoveFraudsterRequestParameters>;

  constructor(
    public msdyn_fraudsterdetectionvoiceprintId: string,
    parameters: CCaaS_VoiceBiometricsMoveFraudsterRequestParameters
  ) {
    super("CCaaS_VoiceBiometricsMoveFraudster", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudsterdetectionvoiceprints(${this.msdyn_fraudsterdetectionvoiceprintId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsMoveFraudster`;

    const body = requestBody({
      SessionId: this.Parameters.SessionId,
      TargetWatchlistId: this.Parameters.TargetWatchlistId,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsMoveFraudsterResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsMoveFraudsterResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsMoveFraudster action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsMoveFraudsterResult {
  "@odata.context"?: string;
  BadRequestReason: string;
  ErrorMessage: string;
  SourceWatchlistId: string;
  StatusCode: string;
  TargetWatchlistId: string;
  VoiceprintId: string;
}

/**
 * CCaaS_VoiceBiometricsMoveFraudster response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsMoveFraudster action returns (see {@link CCaaS_VoiceBiometricsMoveFraudsterResult}).
 */
export class CCaaS_VoiceBiometricsMoveFraudsterResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsMoveFraudsterResult) {
    super("CCaaS_VoiceBiometricsMoveFraudster");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsMoveFraudsterResponse {
    return new CCaaS_VoiceBiometricsMoveFraudsterResponse(
      data as CCaaS_VoiceBiometricsMoveFraudsterResult
    );
  }
}
