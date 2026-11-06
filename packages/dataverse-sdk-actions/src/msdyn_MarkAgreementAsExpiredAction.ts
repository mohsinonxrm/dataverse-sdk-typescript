import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_MarkAgreementAsExpired action
 */
export interface msdyn_MarkAgreementAsExpiredResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * Parameters of the msdyn_MarkAgreementAsExpired action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_MarkAgreementAsExpiredActionParameters {
  AnalysisResult: EntityReference;
}

/**
 * msdyn_MarkAgreementAsExpired action
 *
 * Unbound action
 */
export class msdyn_MarkAgreementAsExpiredAction implements Executable<msdyn_MarkAgreementAsExpiredResponse> {
  constructor(public readonly parameters: msdyn_MarkAgreementAsExpiredActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarkAgreementAsExpired`;

    const body = requestBody({
      AnalysisResult: this.parameters.AnalysisResult,
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

  async parseResponse(response: Response): Promise<msdyn_MarkAgreementAsExpiredResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_MarkAgreementAsExpiredResponse;
  }
}
