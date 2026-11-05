import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_ModelAppRepairResponse as msdyn_ModelAppRepairResponseData } from "./types/index.js";

/**
 * msdyn_ModelAppRepair request message
 *
 * Web API Action: msdyn_ModelAppRepair
 */
export class msdyn_ModelAppRepairRequest
  extends OrganizationRequest
  implements Executable<msdyn_ModelAppRepairResponse>
{
  constructor(public analysisResult: EntityReference) {
    super("msdyn_ModelAppRepair");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppRepair`;

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

  async parseResponse(response: Response): Promise<msdyn_ModelAppRepairResponse> {
    const data = await response.json();
    return msdyn_ModelAppRepairResponse.fromResponse(data);
  }
}

/**
 * msdyn_ModelAppRepair response message
 */
export class msdyn_ModelAppRepairResponse extends OrganizationResponse {
  constructor(public result: msdyn_ModelAppRepairResponseData) {
    super("msdyn_ModelAppRepair");
  }

  static fromResponse(data: unknown): msdyn_ModelAppRepairResponse {
    return new msdyn_ModelAppRepairResponse(responseObject<msdyn_ModelAppRepairResponseData>(data));
  }
}
