import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";

/**
 * Response from the msdyn_OperatingHoursUpgradeFlow action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_OperatingHoursUpgradeFlowResponse = void;

/**
 * msdyn_OperatingHoursUpgradeFlow action
 *
 * Unbound action
 */
export class msdyn_OperatingHoursUpgradeFlowAction implements Executable<msdyn_OperatingHoursUpgradeFlowResponse> {
  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OperatingHoursUpgradeFlow`;

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
    };
  }

  parseResponse(_response: Response): Promise<msdyn_OperatingHoursUpgradeFlowResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
