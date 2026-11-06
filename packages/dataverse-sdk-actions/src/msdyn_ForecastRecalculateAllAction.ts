import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_ForecastRecalculateAll action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_ForecastRecalculateAllResponse = void;

/**
 * msdyn_ForecastRecalculateAll action
 *
 * Unbound action
 */
export class msdyn_ForecastRecalculateAllAction implements Executable<msdyn_ForecastRecalculateAllResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_ForecastRecalculateAll`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_ForecastRecalculateAllResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
