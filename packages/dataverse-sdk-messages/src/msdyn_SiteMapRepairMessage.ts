import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_SiteMapRepairResponse as msdyn_SiteMapRepairResponseData } from "./types/index.js";

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
}

/**
 * msdyn_SiteMapRepair response message
 */
export class msdyn_SiteMapRepairResponse extends OrganizationResponse {
  constructor(public result: msdyn_SiteMapRepairResponseData) {
    super("msdyn_SiteMapRepair");
  }

  static fromResponse(data: unknown): msdyn_SiteMapRepairResponse {
    return new msdyn_SiteMapRepairResponse(responseObject<msdyn_SiteMapRepairResponseData>(data));
  }
}
