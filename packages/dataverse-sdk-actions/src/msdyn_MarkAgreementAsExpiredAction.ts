import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_MarkAgreementAsExpired action
 */
export interface msdyn_MarkAgreementAsExpiredResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * msdyn_MarkAgreementAsExpired action
 *
 * Unbound action
 */
export class msdyn_MarkAgreementAsExpiredAction implements Executable<msdyn_MarkAgreementAsExpiredResponse> {
  constructor(public readonly analysisResult: EntityReference) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarkAgreementAsExpired`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MarkAgreementAsExpiredResponse> {
    const data = await response.json();
    return data as msdyn_MarkAgreementAsExpiredResponse;
  }
}
