import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_TriggerSequenceStatsDockerJob action
 */
export interface msdyn_TriggerSequenceStatsDockerJobResponse {
  JobId: string;
  JobStatus: boolean;
}

/**
 * msdyn_TriggerSequenceStatsDockerJob action
 *
 * Unbound action
 */
export class msdyn_TriggerSequenceStatsDockerJobAction implements Executable<msdyn_TriggerSequenceStatsDockerJobResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_TriggerSequenceStatsDockerJob`;

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerSequenceStatsDockerJobResponse> {
    const data = await response.json();
    return data as msdyn_TriggerSequenceStatsDockerJobResponse;
  }
}
