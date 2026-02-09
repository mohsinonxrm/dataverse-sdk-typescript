import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_AsExchangeEvent action
 */
export interface msdyn_AsExchangeEventResponse {
  value: EntityReference[];
}

/**
 * msdyn_AsExchangeEvent action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.bookableresourcebooking))
 */
export class msdyn_AsExchangeEventAction implements Executable<msdyn_AsExchangeEventResponse> {
  constructor(public readonly msdyn_Bookings: Record<string, unknown>[]) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_AsExchangeEvent`;

    const body: Record<string, unknown> = {
      msdyn_Bookings: this.msdyn_Bookings,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<msdyn_AsExchangeEventResponse> {
    const data = await response.json();
    return data as msdyn_AsExchangeEventResponse;
  }
}
