import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_SiteMapRepair request message
 *
 * Web API Action: msdyn_SiteMapRepair
 */
export class msdyn_SiteMapRepairRequest
  extends OrganizationRequest
  implements Executable<msdyn_SiteMapRepairResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_SiteMapRepair");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SiteMapRepair`;

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

  async parseResponse(response: Response): Promise<msdyn_SiteMapRepairResponse> {
    const data = await response.json();
    return msdyn_SiteMapRepairResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AnalysisResult: this.analysisResult,
    };
  }
}

/**
 * msdyn_SiteMapRepair response message
 */
export class msdyn_SiteMapRepairResponse extends OrganizationResponse {
  constructor(public result: msdyn_SiteMapRepairResponse) {
    super("msdyn_SiteMapRepair");
  }

  static fromResponse(data: unknown): msdyn_SiteMapRepairResponse {
    return new msdyn_SiteMapRepairResponse((data as any).value);
  }
}
