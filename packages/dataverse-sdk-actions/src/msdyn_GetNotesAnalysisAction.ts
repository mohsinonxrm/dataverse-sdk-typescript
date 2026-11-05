import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_GetNotesAnalysis action
 */
export interface msdyn_GetNotesAnalysisResponse {
  NotesAnalysisResult: string;
  IsSuccess: boolean;
}

/**
 * msdyn_GetNotesAnalysis action
 *
 * Unbound action
 */
export class msdyn_GetNotesAnalysisAction implements Executable<msdyn_GetNotesAnalysisResponse> {
  constructor(
    public readonly noteText: string,
    public readonly crossGeoDataMovementEnabled: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetNotesAnalysis`;

    const body: Record<string, unknown> = {
      NoteText: this.noteText,
      CrossGeoDataMovementEnabled: this.crossGeoDataMovementEnabled,
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

  async parseResponse(response: Response): Promise<msdyn_GetNotesAnalysisResponse> {
    const data = await response.json();
    return data as msdyn_GetNotesAnalysisResponse;
  }
}
