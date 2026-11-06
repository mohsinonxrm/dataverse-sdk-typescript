import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_VoiceBiometricsDeleteFraudster action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsDeleteFraudsterResponse {
  "@odata.context"?: string;
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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as CCaaS_VoiceBiometricsDeleteFraudsterResponse;
  }
}
