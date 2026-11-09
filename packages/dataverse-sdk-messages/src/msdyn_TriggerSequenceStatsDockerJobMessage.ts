import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * msdyn_TriggerSequenceStatsDockerJob request message
 *
 * Web API Action: msdyn_TriggerSequenceStatsDockerJob
 */
export class msdyn_TriggerSequenceStatsDockerJobRequest
  extends OrganizationRequest
  implements Executable<msdyn_TriggerSequenceStatsDockerJobResponse>
{
  constructor() {
    super("msdyn_TriggerSequenceStatsDockerJob");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerSequenceStatsDockerJob`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerSequenceStatsDockerJobResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_TriggerSequenceStatsDockerJobResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_TriggerSequenceStatsDockerJob action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerSequenceStatsDockerJobResult {
  "@odata.context"?: string;
  JobId: string;
  JobStatus: boolean;
}

/**
 * msdyn_TriggerSequenceStatsDockerJob response message
 *
 * `result` is the value the msdyn_TriggerSequenceStatsDockerJob action returns (see {@link msdyn_TriggerSequenceStatsDockerJobResult}).
 */
export class msdyn_TriggerSequenceStatsDockerJobResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerSequenceStatsDockerJobResult) {
    super("msdyn_TriggerSequenceStatsDockerJob");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_TriggerSequenceStatsDockerJobResponse {
    return new msdyn_TriggerSequenceStatsDockerJobResponse(
      data as msdyn_TriggerSequenceStatsDockerJobResult
    );
  }
}
