import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Parameters of the msdyn_RetrieveOptimizeSnapshot message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveOptimizeSnapshotRequestParameters {
  RunId?: string;
  EvaluationAsOfUtc?: string;
  PatternTypes?: string;
  SegmentId: string;
}

/**
 * msdyn_RetrieveOptimizeSnapshot request message
 *
 * Web API Action: msdyn_RetrieveOptimizeSnapshot
 */
export class msdyn_RetrieveOptimizeSnapshotRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveOptimizeSnapshotResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveOptimizeSnapshotRequestParameters>;

  constructor(parameters: msdyn_RetrieveOptimizeSnapshotRequestParameters) {
    super("msdyn_RetrieveOptimizeSnapshot", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOptimizeSnapshot`;

    const body = requestBody({
      RunId: this.Parameters.RunId,
      EvaluationAsOfUtc: this.Parameters.EvaluationAsOfUtc,
      PatternTypes: this.Parameters.PatternTypes,
      SegmentId: this.Parameters.SegmentId,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveOptimizeSnapshotResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_RetrieveOptimizeSnapshotResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_RetrieveOptimizeSnapshot action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_RetrieveOptimizeSnapshotResult {
  "@odata.context"?: string;
  Result: string;
}

/**
 * msdyn_RetrieveOptimizeSnapshot response message
 *
 * `result` is the value the msdyn_RetrieveOptimizeSnapshot action returns (see {@link msdyn_RetrieveOptimizeSnapshotResult}).
 */
export class msdyn_RetrieveOptimizeSnapshotResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOptimizeSnapshotResult) {
    super("msdyn_RetrieveOptimizeSnapshot");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_RetrieveOptimizeSnapshotResponse {
    return new msdyn_RetrieveOptimizeSnapshotResponse(data as msdyn_RetrieveOptimizeSnapshotResult);
  }
}
