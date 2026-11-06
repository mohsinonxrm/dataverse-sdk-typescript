import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import { requestBody } from "./internal/requestBody.js";
import type { msdyn_RetrieveOptimizeSnapshotResponse as msdyn_RetrieveOptimizeSnapshotResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveOptimizeSnapshotResponse.fromResponse({});
    return msdyn_RetrieveOptimizeSnapshotResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveOptimizeSnapshot response message
 */
export class msdyn_RetrieveOptimizeSnapshotResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveOptimizeSnapshotResponseData) {
    super("msdyn_RetrieveOptimizeSnapshot");
  }

  static fromResponse(data: unknown): msdyn_RetrieveOptimizeSnapshotResponse {
    return new msdyn_RetrieveOptimizeSnapshotResponse(
      responseObject<msdyn_RetrieveOptimizeSnapshotResponseData>(data)
    );
  }
}
