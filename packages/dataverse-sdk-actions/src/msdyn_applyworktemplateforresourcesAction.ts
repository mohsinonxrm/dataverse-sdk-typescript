import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_applyworktemplateforresources action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_applyworktemplateforresourcesResponse = void;

/**
 * Parameters of the msdyn_applyworktemplateforresources action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_applyworktemplateforresourcesActionParameters {
  calendarIds: string;
  templateCalendarId?: string;
}

/**
 * msdyn_applyworktemplateforresources action
 *
 * Unbound action
 */
export class msdyn_applyworktemplateforresourcesAction implements Executable<msdyn_applyworktemplateforresourcesResponse> {
  constructor(public readonly parameters: msdyn_applyworktemplateforresourcesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_applyworktemplateforresources`;

    const body = requestBody({
      calendarIds: this.parameters.calendarIds,
      templateCalendarId: this.parameters.templateCalendarId,
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

  parseResponse(_response: Response): Promise<msdyn_applyworktemplateforresourcesResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
