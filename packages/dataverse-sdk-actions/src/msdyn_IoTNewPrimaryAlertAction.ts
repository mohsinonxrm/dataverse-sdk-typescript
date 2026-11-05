import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msdyn_iotalert } from "./types/index.js";

/**
 * Response from msdyn_IoTNewPrimaryAlert action
 */
export interface msdyn_IoTNewPrimaryAlertResponse {
  // No content returned
}

/**
 * msdyn_IoTNewPrimaryAlert action
 *
 * Unbound action
 */
export class msdyn_IoTNewPrimaryAlertAction implements Executable<msdyn_IoTNewPrimaryAlertResponse> {
  constructor(public readonly primaryAlert: msdyn_iotalert) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTNewPrimaryAlert`;

    const body: Record<string, unknown> = {
      PrimaryAlert: this.primaryAlert,
    };

    return {
      method: "POST",
      url,
      headers: {
        "content-type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_IoTNewPrimaryAlertResponse> {
    // No return value (204 No Content)
    return {};
  }
}
