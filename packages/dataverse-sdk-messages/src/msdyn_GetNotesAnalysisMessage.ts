import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_GetNotesAnalysisResponse as msdyn_GetNotesAnalysisResponseData } from "./types/index.js";

/**
 * msdyn_GetNotesAnalysis request message
 *
 * Web API Action: msdyn_GetNotesAnalysis
 */
export class msdyn_GetNotesAnalysisRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetNotesAnalysisResponse>
{
  constructor(
    public noteText?: string,
    public crossGeoDataMovementEnabled?: boolean
  ) {
    super("msdyn_GetNotesAnalysis");
  }

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
    return msdyn_GetNotesAnalysisResponse.fromResponse(data);
  }
}

/**
 * msdyn_GetNotesAnalysis response message
 */
export class msdyn_GetNotesAnalysisResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetNotesAnalysisResponseData) {
    super("msdyn_GetNotesAnalysis");
  }

  static fromResponse(data: unknown): msdyn_GetNotesAnalysisResponse {
    return new msdyn_GetNotesAnalysisResponse(
      responseObject<msdyn_GetNotesAnalysisResponseData>(data)
    );
  }
}
