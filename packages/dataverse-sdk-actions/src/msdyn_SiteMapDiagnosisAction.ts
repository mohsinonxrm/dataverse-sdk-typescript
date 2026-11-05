import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { sitemap } from "./types/index.js";

/**
 * Response from msdyn_SiteMapDiagnosis action
 */
export interface msdyn_SiteMapDiagnosisResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  RepairIssueType: string;
  HelpLink: string;
}

/**
 * msdyn_SiteMapDiagnosis action
 *
 * Unbound action
 */
export class msdyn_SiteMapDiagnosisAction implements Executable<msdyn_SiteMapDiagnosisResponse> {
  constructor(
    public readonly issueType: string,
    public readonly componentInstance: sitemap
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SiteMapDiagnosis`;

    const body: Record<string, unknown> = {
      IssueType: this.issueType,
      ComponentInstance: this.componentInstance,
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

  async parseResponse(response: Response): Promise<msdyn_SiteMapDiagnosisResponse> {
    const data = await response.json();
    return data as msdyn_SiteMapDiagnosisResponse;
  }
}
