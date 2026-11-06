import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { msdyn_TriggerSequenceStatsDockerJobResponse as msdyn_TriggerSequenceStatsDockerJobResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_TriggerSequenceStatsDockerJobResponse.fromResponse({});
    return msdyn_TriggerSequenceStatsDockerJobResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_TriggerSequenceStatsDockerJob response message
 */
export class msdyn_TriggerSequenceStatsDockerJobResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerSequenceStatsDockerJobResponseData) {
    super("msdyn_TriggerSequenceStatsDockerJob");
  }

  static fromResponse(data: unknown): msdyn_TriggerSequenceStatsDockerJobResponse {
    return new msdyn_TriggerSequenceStatsDockerJobResponse(
      responseObject<msdyn_TriggerSequenceStatsDockerJobResponseData>(data)
    );
  }
}
