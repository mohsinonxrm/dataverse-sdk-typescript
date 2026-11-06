import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_PerformNotesAnalysisActionResponse as msdyn_PerformNotesAnalysisActionResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_PerformNotesAnalysisAction message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_PerformNotesAnalysisActionRequestParameters {
  EntityName?: string;
  SerializedAction?: string;
  ParentEntityName?: string;
  ParentEntityId?: string;
}

/**
 * msdyn_PerformNotesAnalysisAction request message
 *
 * Web API Action: msdyn_PerformNotesAnalysisAction
 */
export class msdyn_PerformNotesAnalysisActionRequest
  extends OrganizationRequest
  implements Executable<msdyn_PerformNotesAnalysisActionResponse>
{
  declare readonly Parameters: Readonly<msdyn_PerformNotesAnalysisActionRequestParameters>;

  constructor(parameters: msdyn_PerformNotesAnalysisActionRequestParameters = {}) {
    super("msdyn_PerformNotesAnalysisAction", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_PerformNotesAnalysisAction`;

    const body = requestBody({
      EntityName: this.Parameters.EntityName,
      SerializedAction: this.Parameters.SerializedAction,
      ParentEntityName: this.Parameters.ParentEntityName,
      ParentEntityId: this.Parameters.ParentEntityId,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_PerformNotesAnalysisActionResponse.fromResponse({});
    return msdyn_PerformNotesAnalysisActionResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_PerformNotesAnalysisAction response message
 */
export class msdyn_PerformNotesAnalysisActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_PerformNotesAnalysisActionResponseData) {
    super("msdyn_PerformNotesAnalysisAction");
  }

  static fromResponse(data: unknown): msdyn_PerformNotesAnalysisActionResponse {
    return new msdyn_PerformNotesAnalysisActionResponse(
      responseObject<msdyn_PerformNotesAnalysisActionResponseData>(data)
    );
  }
}
