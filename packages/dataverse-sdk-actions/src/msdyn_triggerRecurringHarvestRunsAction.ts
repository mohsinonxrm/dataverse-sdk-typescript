import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_triggerRecurringHarvestRuns action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_triggerRecurringHarvestRunsResponse = void;

/**
 * msdyn_triggerRecurringHarvestRuns action
 *
 * Unbound action
 */
export class msdyn_triggerRecurringHarvestRunsAction implements Executable<msdyn_triggerRecurringHarvestRunsResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_triggerRecurringHarvestRuns`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_triggerRecurringHarvestRunsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
