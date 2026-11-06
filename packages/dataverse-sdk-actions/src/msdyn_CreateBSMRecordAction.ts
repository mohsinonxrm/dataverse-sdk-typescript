import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_CreateBSMRecord action
 */
export interface msdyn_CreateBSMRecordResponse {
  ResolvedRecordsCount: number;
  ResolutionState: number;
}

/**
 * Parameters of the msdyn_CreateBSMRecord action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateBSMRecordActionParameters {
  AnalysisResult: EntityReference;
}

/**
 * msdyn_CreateBSMRecord action
 *
 * Unbound action
 */
export class msdyn_CreateBSMRecordAction implements Executable<msdyn_CreateBSMRecordResponse> {
  constructor(public readonly parameters: msdyn_CreateBSMRecordActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateBSMRecord`;

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

  async parseResponse(response: Response): Promise<msdyn_CreateBSMRecordResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_CreateBSMRecordResponse;
  }
}
