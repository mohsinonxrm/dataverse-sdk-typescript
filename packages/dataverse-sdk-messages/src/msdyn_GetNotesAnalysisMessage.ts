import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_GetNotesAnalysisResponse as msdyn_GetNotesAnalysisResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_GetNotesAnalysisResponse.fromResponse({});
    return msdyn_GetNotesAnalysisResponse.fromResponse(await response.json());
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
