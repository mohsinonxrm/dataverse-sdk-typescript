import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_OrphanCalendarCleanup action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_OrphanCalendarCleanupResponse = void;

/**
 * Parameters of the msdyn_OrphanCalendarCleanup action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_OrphanCalendarCleanupActionParameters {
  CalendarId: string;
}

/**
 * msdyn_OrphanCalendarCleanup action
 *
 * Unbound action
 */
export class msdyn_OrphanCalendarCleanupAction implements Executable<msdyn_OrphanCalendarCleanupResponse> {
  constructor(public readonly parameters: msdyn_OrphanCalendarCleanupActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_OrphanCalendarCleanup`;

    const body = requestBody({
      CalendarId: this.parameters.CalendarId,
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

  parseResponse(_response: Response): Promise<msdyn_OrphanCalendarCleanupResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
