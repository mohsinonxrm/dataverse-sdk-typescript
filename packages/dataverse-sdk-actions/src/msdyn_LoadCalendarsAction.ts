import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_LoadCalendars action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_LoadCalendarsResponse {
  "@odata.context"?: string;
  CalendarEvents: string;
}

/**
 * Parameters of the msdyn_LoadCalendars action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_LoadCalendarsActionParameters {
  LoadCalendarsInput: string;
}

/**
 * msdyn_LoadCalendars action
 *
 * Unbound action
 */
export class msdyn_LoadCalendarsAction implements Executable<msdyn_LoadCalendarsResponse> {
  constructor(public readonly parameters: msdyn_LoadCalendarsActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_LoadCalendars`;

    const body = requestBody({
      LoadCalendarsInput: this.parameters.LoadCalendarsInput,
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

  async parseResponse(response: Response): Promise<msdyn_LoadCalendarsResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_LoadCalendarsResponse;
  }
}
