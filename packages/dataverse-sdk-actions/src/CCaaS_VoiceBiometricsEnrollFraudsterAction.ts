import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceBiometricsEnrollFraudster action
 */
export interface CCaaS_VoiceBiometricsEnrollFraudsterResponse {
  BadRequestReason: string;
  ErrorMessage: string;
  FailureReason: string;
  FraudsterId: string;
  Outcome: string;
  StatusCode: string;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsEnrollFraudster action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsEnrollFraudsterActionParameters {
  SessionId?: string;
  FraudsterName: string;
  CorrelationId?: string;
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsEnrollFraudster action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_fraudresult)
 *
 * The first argument is the id of the msdyn_fraudresult record to call it on.
 */
export class CCaaS_VoiceBiometricsEnrollFraudsterAction implements Executable<CCaaS_VoiceBiometricsEnrollFraudsterResponse> {
  constructor(
    public readonly msdyn_fraudresultId: string,
    public readonly parameters: CCaaS_VoiceBiometricsEnrollFraudsterActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudresults(${this.msdyn_fraudresultId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsEnrollFraudster`;

    const body = requestBody({
      SessionId: this.parameters.SessionId,
      FraudsterName: this.parameters.FraudsterName,
      CorrelationId: this.parameters.CorrelationId,
      WatchlistId: this.parameters.WatchlistId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_VoiceBiometricsEnrollFraudsterResponse;
    return (await response.json()) as CCaaS_VoiceBiometricsEnrollFraudsterResponse;
  }
}
