import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from CCaaS_VoiceBiometricsDeleteFraudster action
 */
export interface CCaaS_VoiceBiometricsDeleteFraudsterResponse {
  BadRequestReason: string;
  Deleted: string[];
  ErrorMessage: string;
  Failed: string[];
  NotFound: string[];
  StatusCode: string;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsDeleteFraudster action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsDeleteFraudsterActionParameters {
  CorrelationId?: string;
  SessionId?: string;
  FraudsterIds: string[];
  WatchlistId: string;
}

/**
 * CCaaS_VoiceBiometricsDeleteFraudster action
 *
 * Unbound action
 */
export class CCaaS_VoiceBiometricsDeleteFraudsterAction implements Executable<CCaaS_VoiceBiometricsDeleteFraudsterResponse> {
  constructor(public readonly parameters: CCaaS_VoiceBiometricsDeleteFraudsterActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/CCaaS_VoiceBiometricsDeleteFraudster`;

    const body = requestBody({
      CorrelationId: this.parameters.CorrelationId,
      SessionId: this.parameters.SessionId,
      FraudsterIds: this.parameters.FraudsterIds,
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

  async parseResponse(response: Response): Promise<CCaaS_VoiceBiometricsDeleteFraudsterResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as CCaaS_VoiceBiometricsDeleteFraudsterResponse;
    return (await response.json()) as CCaaS_VoiceBiometricsDeleteFraudsterResponse;
  }
}
