import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_SiteMapDiagnosisResponse as msdyn_SiteMapDiagnosisResponseData,
  sitemap,
} from "./types/index.js";

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
    public componentInstance: EntityReference | EntityPayload<sitemap>
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
}

/**
 * msdyn_SiteMapDiagnosis response message
 */
export class msdyn_SiteMapDiagnosisResponse extends OrganizationResponse {
  constructor(public result: msdyn_SiteMapDiagnosisResponseData) {
    super("msdyn_SiteMapDiagnosis");
  }

  static fromResponse(data: unknown): msdyn_SiteMapDiagnosisResponse {
    return new msdyn_SiteMapDiagnosisResponse(
      responseObject<msdyn_SiteMapDiagnosisResponseData>(data)
    );
  }
}
