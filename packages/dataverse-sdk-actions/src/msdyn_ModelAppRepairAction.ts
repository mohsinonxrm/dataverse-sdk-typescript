import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_ModelAppRepair action
 */
export interface msdyn_ModelAppRepairResponse {
  HelpLink: string;
  ResolutionState: number;
  ResolvedRecordsCount: number;
}

/**
 * Parameters of the msdyn_ModelAppRepair action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_ModelAppRepairActionParameters {
  AnalysisResult?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_ModelAppRepair action
 *
 * Unbound action
 */
export class msdyn_ModelAppRepairAction implements Executable<msdyn_ModelAppRepairResponse> {
  constructor(public readonly parameters: msdyn_ModelAppRepairActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ModelAppRepair`;

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

  async parseResponse(response: Response): Promise<msdyn_ModelAppRepairResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_ModelAppRepairResponse;
    return (await response.json()) as msdyn_ModelAppRepairResponse;
  }
}
