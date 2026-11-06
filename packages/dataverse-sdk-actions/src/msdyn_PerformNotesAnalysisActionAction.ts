import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_PerformNotesAnalysisAction action
 */
export interface msdyn_PerformNotesAnalysisActionResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_PerformNotesAnalysisAction action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PerformNotesAnalysisActionActionParameters {
  EntityName?: string;
  SerializedAction?: string;
  ParentEntityName?: string;
  ParentEntityId?: string;
}

/**
 * msdyn_PerformNotesAnalysisAction action
 *
 * Unbound action
 */
export class msdyn_PerformNotesAnalysisActionAction implements Executable<msdyn_PerformNotesAnalysisActionResponse> {
  constructor(public readonly parameters: msdyn_PerformNotesAnalysisActionActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformNotesAnalysisAction`;

    const body = requestBody({
      EntityName: this.parameters.EntityName,
      SerializedAction: this.parameters.SerializedAction,
      ParentEntityName: this.parameters.ParentEntityName,
      ParentEntityId: this.parameters.ParentEntityId,
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

  async parseResponse(response: Response): Promise<msdyn_PerformNotesAnalysisActionResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_PerformNotesAnalysisActionResponse;
  }
}
