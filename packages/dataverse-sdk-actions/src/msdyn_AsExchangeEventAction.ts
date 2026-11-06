import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from msdyn_AsExchangeEvent action
 */
export interface msdyn_AsExchangeEventResponse {
  value: EntityReference[];
}

/**
 * Parameters of the msdyn_AsExchangeEvent action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_AsExchangeEventActionParameters {
  msdyn_Bookings: Record<string, unknown>[];
}

/**
 * msdyn_AsExchangeEvent action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.bookableresourcebooking))
 */
export class msdyn_AsExchangeEventAction implements Executable<msdyn_AsExchangeEventResponse> {
  constructor(public readonly parameters: msdyn_AsExchangeEventActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/bookableresourcebookings/Microsoft.Dynamics.CRM.msdyn_AsExchangeEvent`;

    const body = requestBody({
      msdyn_Bookings: this.parameters.msdyn_Bookings,
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

  async parseResponse(response: Response): Promise<msdyn_AsExchangeEventResponse> {
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_AsExchangeEventResponse;
  }
}
