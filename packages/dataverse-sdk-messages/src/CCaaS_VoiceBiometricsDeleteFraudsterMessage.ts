import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the CCaaS_VoiceBiometricsDeleteFraudster message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsDeleteFraudsterRequestParameters {
  CorrelationId?: string;
  SessionId?: string;
  FraudsterIds: string[];
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsDeleteFraudster request message
 *
 * Web API Action: CCaaS_VoiceBiometricsDeleteFraudster
 */
export class CCaaS_VoiceBiometricsDeleteFraudsterRequest
  extends OrganizationRequest
  implements Executable<CCaaS_VoiceBiometricsDeleteFraudsterResponse>
{
  declare readonly Parameters: Readonly<CCaaS_VoiceBiometricsDeleteFraudsterRequestParameters>;

  constructor(parameters: CCaaS_VoiceBiometricsDeleteFraudsterRequestParameters) {
    super("CCaaS_VoiceBiometricsDeleteFraudster", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceBiometricsDeleteFraudster`;

    const body = requestBody({
      CorrelationId: this.Parameters.CorrelationId,
      SessionId: this.Parameters.SessionId,
      FraudsterIds: this.Parameters.FraudsterIds,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsDeleteFraudsterResponse> {
    // The body is the complex value, with its @odata.context
    return CCaaS_VoiceBiometricsDeleteFraudsterResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the CCaaS_VoiceBiometricsDeleteFraudster action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsDeleteFraudsterResult {
  "@odata.context"?: string;
  BadRequestReason: string;
  Deleted: string[];
  ErrorMessage: string;
  Failed: string[];
  NotFound: string[];
  StatusCode: string;
}

/**
 * CCaaS_VoiceBiometricsDeleteFraudster response message
 *
 * `result` is the value the CCaaS_VoiceBiometricsDeleteFraudster action returns (see {@link CCaaS_VoiceBiometricsDeleteFraudsterResult}).
 */
export class CCaaS_VoiceBiometricsDeleteFraudsterResponse extends OrganizationResponse {
  constructor(public result: CCaaS_VoiceBiometricsDeleteFraudsterResult) {
    super("CCaaS_VoiceBiometricsDeleteFraudster");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): CCaaS_VoiceBiometricsDeleteFraudsterResponse {
    return new CCaaS_VoiceBiometricsDeleteFraudsterResponse(
      data as CCaaS_VoiceBiometricsDeleteFraudsterResult
    );
  }
}
