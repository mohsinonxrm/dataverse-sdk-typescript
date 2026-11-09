import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_GetNotesAnalysis message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetNotesAnalysisRequestParameters {
  NoteText?: string;
  CrossGeoDataMovementEnabled?: boolean;
}

/**
 * msdyn_GetNotesAnalysis request message
 *
 * Web API Action: msdyn_GetNotesAnalysis
 */
export class msdyn_GetNotesAnalysisRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetNotesAnalysisResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetNotesAnalysisRequestParameters>;

  constructor(parameters: msdyn_GetNotesAnalysisRequestParameters = {}) {
    super("msdyn_GetNotesAnalysis", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetNotesAnalysis`;

    const body = requestBody({
      NoteText: this.Parameters.NoteText,
      CrossGeoDataMovementEnabled: this.Parameters.CrossGeoDataMovementEnabled,
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
    // The body is the complex value, with its @odata.context
    return msdyn_GetNotesAnalysisResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetNotesAnalysis action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetNotesAnalysisResult {
  "@odata.context"?: string;
  IsSuccess: boolean;
  NotesAnalysisResult: string;
}

/**
 * msdyn_GetNotesAnalysis response message
 *
 * `result` is the value the msdyn_GetNotesAnalysis action returns (see {@link msdyn_GetNotesAnalysisResult}).
 */
export class msdyn_GetNotesAnalysisResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetNotesAnalysisResult) {
    super("msdyn_GetNotesAnalysis");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetNotesAnalysisResponse {
    return new msdyn_GetNotesAnalysisResponse(data as msdyn_GetNotesAnalysisResult);
  }
}
