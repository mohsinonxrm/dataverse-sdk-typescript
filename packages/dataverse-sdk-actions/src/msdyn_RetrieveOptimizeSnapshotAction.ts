import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_RetrieveOptimizeSnapshot action
 */
export interface msdyn_RetrieveOptimizeSnapshotResponse {
  Result: string;
}

/**
 * Parameters of the msdyn_RetrieveOptimizeSnapshot action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveOptimizeSnapshotActionParameters {
  RunId?: string;
  EvaluationAsOfUtc?: string;
  PatternTypes?: string;
  SegmentId: string;
}

/**
 * msdyn_RetrieveOptimizeSnapshot action
 *
 * Unbound action
 */
export class msdyn_RetrieveOptimizeSnapshotAction implements Executable<msdyn_RetrieveOptimizeSnapshotResponse> {
  constructor(public readonly parameters: msdyn_RetrieveOptimizeSnapshotActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveOptimizeSnapshot`;

    const body = requestBody({
      RunId: this.parameters.RunId,
      EvaluationAsOfUtc: this.parameters.EvaluationAsOfUtc,
      PatternTypes: this.parameters.PatternTypes,
      SegmentId: this.parameters.SegmentId,
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
    if (response.status === 204) return {} as msdyn_RetrieveOptimizeSnapshotResponse;
    return (await response.json()) as msdyn_RetrieveOptimizeSnapshotResponse;
  }
}
