import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_TriggerSequenceStatsDockerJob action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_TriggerSequenceStatsDockerJobResponse {
  "@odata.context"?: string;
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
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_TriggerSequenceStatsDockerJobResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_TriggerSequenceStatsDockerJobResponse;
  }
}
