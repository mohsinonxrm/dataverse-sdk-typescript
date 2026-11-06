import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_iotalert } from "./types/index.js";

/**
 * Response from the msdyn_IoTNewPrimaryAlert action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_IoTNewPrimaryAlertResponse = void;

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

  parseResponse(_response: Response): Promise<msdyn_IoTNewPrimaryAlertResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
