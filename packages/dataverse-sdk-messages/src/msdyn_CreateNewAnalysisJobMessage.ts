import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_analysisjob } from "./types/index.js";

/**
 * Parameters of the msdyn_CreateNewAnalysisJob message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CreateNewAnalysisJobRequestParameters {
  ComponentInstances?: Record<string, unknown>[];
}

/**
 * msdyn_CreateNewAnalysisJob request message
 *
 * Web API Action: msdyn_CreateNewAnalysisJob
 */
export class msdyn_CreateNewAnalysisJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_CreateNewAnalysisJobResponse>
{
  declare readonly Parameters: Readonly<msdyn_CreateNewAnalysisJobRequestParameters>;

  constructor(parameters: msdyn_CreateNewAnalysisJobRequestParameters = {}) {
    super("msdyn_CreateNewAnalysisJob", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CreateNewAnalysisJob`;

    const body = requestBody({
      ComponentInstances: this.Parameters.ComponentInstances,
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

  async parseResponse(response: Response): Promise<msdyn_CreateNewAnalysisJobResponse> {
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return msdyn_CreateNewAnalysisJobResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return msdyn_CreateNewAnalysisJobResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_CreateNewAnalysisJob action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type msdyn_CreateNewAnalysisJobResult =
  | (msdyn_analysisjob & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * msdyn_CreateNewAnalysisJob response message
 *
 * `result` is the value the msdyn_CreateNewAnalysisJob action returns (see {@link msdyn_CreateNewAnalysisJobResult}).
 */
export class msdyn_CreateNewAnalysisJobResponse extends OrganizationResponse {
  constructor(public result: msdyn_CreateNewAnalysisJobResult) {
    super("msdyn_CreateNewAnalysisJob");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_CreateNewAnalysisJobResponse {
    return new msdyn_CreateNewAnalysisJobResponse(
      (data ?? null) as msdyn_CreateNewAnalysisJobResult
    );
  }
}
