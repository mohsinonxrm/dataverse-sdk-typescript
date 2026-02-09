import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

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
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ModelAppRepairResponse> {
    const data = await response.json();
    return msdyn_ModelAppRepairResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      AnalysisResult: this.analysisResult,
    };
  }
}

/**
 * msdyn_ModelAppRepair response message
 */
export class msdyn_ModelAppRepairResponse extends OrganizationResponse {
  constructor(public result: msdyn_ModelAppRepairResponse) {
    super("msdyn_ModelAppRepair");
  }

  static fromResponse(data: unknown): msdyn_ModelAppRepairResponse {
    return new msdyn_ModelAppRepairResponse((data as any).value);
  }
}
