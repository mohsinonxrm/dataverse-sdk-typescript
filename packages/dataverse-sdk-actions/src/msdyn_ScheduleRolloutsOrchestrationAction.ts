import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from msdyn_ScheduleRolloutsOrchestration action
 */
export interface msdyn_ScheduleRolloutsOrchestrationResponse {
  // No content returned
}

/**
 * msdyn_ScheduleRolloutsOrchestration action
 *
 * Unbound action
 */
export class msdyn_ScheduleRolloutsOrchestrationAction implements Executable<msdyn_ScheduleRolloutsOrchestrationResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ScheduleRolloutsOrchestration`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  async parseResponse(response: Response): Promise<msdyn_ScheduleRolloutsOrchestrationResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_ScheduleRolloutsOrchestrationResponse;
  }
}
