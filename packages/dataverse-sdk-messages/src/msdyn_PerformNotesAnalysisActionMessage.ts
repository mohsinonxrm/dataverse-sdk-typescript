import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

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
    // The body is the complex value, with its @odata.context
    return msdyn_PerformNotesAnalysisActionResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_PerformNotesAnalysisAction action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_PerformNotesAnalysisActionResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_PerformNotesAnalysisAction response message
 *
 * `result` is the value the msdyn_PerformNotesAnalysisAction action returns (see {@link msdyn_PerformNotesAnalysisActionResult}).
 */
export class msdyn_PerformNotesAnalysisActionResponse extends OrganizationResponse {
  constructor(public result: msdyn_PerformNotesAnalysisActionResult) {
    super("msdyn_PerformNotesAnalysisAction");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_PerformNotesAnalysisActionResponse {
    return new msdyn_PerformNotesAnalysisActionResponse(
      data as msdyn_PerformNotesAnalysisActionResult
    );
  }
}
