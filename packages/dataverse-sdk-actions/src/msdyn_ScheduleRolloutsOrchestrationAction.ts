import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_ScheduleRolloutsOrchestration action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ScheduleRolloutsOrchestrationResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_ScheduleRolloutsOrchestrationResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
