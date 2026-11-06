import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { requestBody } from "./internal/requestBody.js";

/**
 * Response from the msdyn_CascadeCrewBookings action.
 *
 * Nothing: the Web API answers 204 No Content.
 */
export type msdyn_CascadeCrewBookingsResponse = void;

/**
 * Parameters of the msdyn_CascadeCrewBookings action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CascadeCrewBookingsActionParameters {
  BookingsToCreate?: Record<string, unknown>[];
  BookingsToUpdate?: Record<string, unknown>[];
  ParentBookingsToUpdate?: Record<string, unknown>[];
  BatchNumber?: number;
}

/**
 * msdyn_CascadeCrewBookings action
 *
 * Unbound action
 */
export class msdyn_CascadeCrewBookingsAction implements Executable<msdyn_CascadeCrewBookingsResponse> {
  constructor(public readonly parameters: msdyn_CascadeCrewBookingsActionParameters = {}) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeCrewBookings`;

    const body = requestBody({
      BookingsToCreate: this.parameters.BookingsToCreate,
      BookingsToUpdate: this.parameters.BookingsToUpdate,
      ParentBookingsToUpdate: this.parameters.ParentBookingsToUpdate,
      BatchNumber: this.parameters.BatchNumber,
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

  parseResponse(_response: Response): Promise<msdyn_CascadeCrewBookingsResponse> {
    // No return value: the Web API answers 204 No Content
    return Promise.resolve();
  }
}
