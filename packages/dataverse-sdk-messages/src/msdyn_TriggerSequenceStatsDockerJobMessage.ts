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
    const data = await response.json();
    return msdyn_TriggerSequenceStatsDockerJobResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {};
  }
}

/**
 * msdyn_TriggerSequenceStatsDockerJob response message
 */
export class msdyn_TriggerSequenceStatsDockerJobResponse extends OrganizationResponse {
  constructor(public result: msdyn_TriggerSequenceStatsDockerJobResponse) {
    super("msdyn_TriggerSequenceStatsDockerJob");
  }

  static fromResponse(data: unknown): msdyn_TriggerSequenceStatsDockerJobResponse {
    return new msdyn_TriggerSequenceStatsDockerJobResponse((data as any).value);
  }
}
