import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the CCaaS_VoiceBiometricsMoveFraudster action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface CCaaS_VoiceBiometricsMoveFraudsterResponse {
  "@odata.context"?: string;
  BadRequestReason: string;
  ErrorMessage: string;
  SourceWatchlistId: string;
  StatusCode: string;
  TargetWatchlistId: string;
  VoiceprintId: string;
}

/**
 * Parameters of the CCaaS_VoiceBiometricsMoveFraudster action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface CCaaS_VoiceBiometricsMoveFraudsterActionParameters {
  SessionId?: string;
  TargetWatchlistId: string;
  CorrelationId?: string;
}

/**
 * CCaaS_VoiceBiometricsMoveFraudster action
 *
 * Bound action
 * Binding parameter: entity (mscrm.msdyn_fraudsterdetectionvoiceprint)
 *
 * The first argument is the id of the msdyn_fraudsterdetectionvoiceprint record to call it on.
 */
export class CCaaS_VoiceBiometricsMoveFraudsterAction implements Executable<CCaaS_VoiceBiometricsMoveFraudsterResponse> {
  constructor(
    public readonly msdyn_fraudsterdetectionvoiceprintId: string,
    public readonly parameters: CCaaS_VoiceBiometricsMoveFraudsterActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action
    const url = `${baseUrl}/msdyn_fraudsterdetectionvoiceprints(${this.msdyn_fraudsterdetectionvoiceprintId})/Microsoft.Dynamics.CRM.CCaaS_VoiceBiometricsMoveFraudster`;

    const body = requestBody({
      SessionId: this.parameters.SessionId,
      TargetWatchlistId: this.parameters.TargetWatchlistId,
      CorrelationId: this.parameters.CorrelationId,
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
    return (await response.json()) as CCaaS_VoiceBiometricsMoveFraudsterResponse;
  }
}
