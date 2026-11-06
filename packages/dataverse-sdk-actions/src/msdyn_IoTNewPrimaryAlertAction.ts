import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_iotalert } from "./types/index.js";

/**
 * Response from msdyn_IoTNewPrimaryAlert action
 */
export interface msdyn_IoTNewPrimaryAlertResponse {
  // No content returned
}

/**
 * Parameters of the msdyn_IoTNewPrimaryAlert action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_IoTNewPrimaryAlertActionParameters {
  PrimaryAlert: EntityReference | EntityPayload<msdyn_iotalert>;
}

/**
 * msdyn_IoTNewPrimaryAlert action
 *
 * Unbound action
 */
export class msdyn_IoTNewPrimaryAlertAction implements Executable<msdyn_IoTNewPrimaryAlertResponse> {
  constructor(public readonly parameters: msdyn_IoTNewPrimaryAlertActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_IoTNewPrimaryAlert`;

    const body = requestBody({
      PrimaryAlert: this.parameters.PrimaryAlert,
    });

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
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_IoTNewPrimaryAlertResponse;
    return (await response.json()) as msdyn_IoTNewPrimaryAlertResponse;
  }
}
