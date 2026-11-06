import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { appmodule } from "./types/index.js";

/**
 * Response from msdyn_ModelAppDiagnosis action
 */
export interface msdyn_ModelAppDiagnosisResponse {
  Message: string;
  ReturnStatus: number;
  ResultEntities: string;
  RepairIssueType: string;
  HelpLink: string;
}

/**
 * msdyn_ModelAppDiagnosis action
 *
 * Unbound action
 */
export class msdyn_ModelAppDiagnosisAction implements Executable<msdyn_ModelAppDiagnosisResponse> {
  constructor(
    public readonly issueType: string,
    public readonly componentInstance: EntityReference | EntityPayload<appmodule>
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppDiagnosis`;

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

  async parseResponse(response: Response): Promise<msdyn_ModelAppDiagnosisResponse> {
    const data = await response.json();
    return data as msdyn_ModelAppDiagnosisResponse;
  }
}
