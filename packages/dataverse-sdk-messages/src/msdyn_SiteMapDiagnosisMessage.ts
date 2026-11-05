import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { sitemap } from "./types/index.js";

/**
 * msdyn_SiteMapDiagnosis request message
 *
 * Web API Action: msdyn_SiteMapDiagnosis
 */
export class msdyn_SiteMapDiagnosisRequest
  extends OrganizationRequest
  implements Executable<msdyn_SiteMapDiagnosisResponse>
{
  constructor(
    public issueType: string,
    public componentInstance: sitemap
  ) {
    super("msdyn_SiteMapDiagnosis");
  }

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
    return msdyn_SiteMapDiagnosisResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      IssueType: this.issueType,
      ComponentInstance: this.componentInstance,
    };
  }
}

/**
 * msdyn_SiteMapDiagnosis response message
 */
export class msdyn_SiteMapDiagnosisResponse extends OrganizationResponse {
  constructor(public result: msdyn_SiteMapDiagnosisResponse) {
    super("msdyn_SiteMapDiagnosis");
  }

  static fromResponse(data: unknown): msdyn_SiteMapDiagnosisResponse {
    return new msdyn_SiteMapDiagnosisResponse((data as any).value);
  }
}
