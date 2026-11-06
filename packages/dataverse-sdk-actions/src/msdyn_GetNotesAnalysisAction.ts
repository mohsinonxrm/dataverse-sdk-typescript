import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_GetNotesAnalysis action
 */
export interface msdyn_GetNotesAnalysisResponse {
  NotesAnalysisResult: string;
  IsSuccess: boolean;
}

/**
 * Parameters of the msdyn_GetNotesAnalysis action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetNotesAnalysisActionParameters {
  NoteText?: string;
  CrossGeoDataMovementEnabled?: boolean;
}

/**
 * msdyn_GetNotesAnalysis action
 *
 * Unbound action
 */
export class msdyn_GetNotesAnalysisAction implements Executable<msdyn_GetNotesAnalysisResponse> {
  constructor(public readonly parameters: msdyn_GetNotesAnalysisActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetNotesAnalysis`;

    const body = requestBody({
      NoteText: this.parameters.NoteText,
      CrossGeoDataMovementEnabled: this.parameters.CrossGeoDataMovementEnabled,
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

  async parseResponse(response: Response): Promise<msdyn_GetNotesAnalysisResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_GetNotesAnalysisResponse;
    return (await response.json()) as msdyn_GetNotesAnalysisResponse;
  }
}
