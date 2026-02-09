import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_MarkAgreementAsExpired request message
 *
 * Web API Action: msdyn_MarkAgreementAsExpired
 */
export class msdyn_MarkAgreementAsExpiredRequest
  extends OrganizationRequest
  implements Executable<msdyn_MarkAgreementAsExpiredResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_MarkAgreementAsExpired");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_MarkAgreementAsExpired`;

    const body: Record<string, unknown> = {
      AnalysisResult: this.analysisResult,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_MarkAgreementAsExpiredResponse> {
    const data = await response.json();
    return msdyn_MarkAgreementAsExpiredResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AnalysisResult: this.analysisResult,
    };
  }
}

/**
 * msdyn_MarkAgreementAsExpired response message
 */
export class msdyn_MarkAgreementAsExpiredResponse extends OrganizationResponse {
  constructor(public result: msdyn_MarkAgreementAsExpiredResponse) {
    super("msdyn_MarkAgreementAsExpired");
  }

  static fromResponse(data: unknown): msdyn_MarkAgreementAsExpiredResponse {
    return new msdyn_MarkAgreementAsExpiredResponse((data as any).value);
  }
}
