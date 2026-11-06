import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_CascadeBookingChanges action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_CascadeBookingChangesResponse {
  "@odata.context"?: string;
}

/**
 * Parameters of the msdyn_CascadeBookingChanges action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CascadeBookingChangesActionParameters {
  MessageName: string;
  Stage: number;
  SourceBooking: EntityReference | AnyEntityPayload;
  SourcePreImageBooking?: EntityReference | AnyEntityPayload;
  SourceRelatedBookingsCreate?: Record<string, unknown>[];
  SourceRelatedBookingsUpdate?: Record<string, unknown>[];
  SourceRelatedBookingsDelete?: Record<string, unknown>[];
  SourcePreImageRelatedBookingsUpdate?: Record<string, unknown>[];
  SourcePreImageRelatedBookingsDelete?: Record<string, unknown>[];
}

/**
 * msdyn_CascadeBookingChanges action
 *
 * Unbound action
 */
export class msdyn_CascadeBookingChangesAction implements Executable<msdyn_CascadeBookingChangesResponse> {
  constructor(public readonly parameters: msdyn_CascadeBookingChangesActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeBookingChanges`;

    const body = requestBody({
      MessageName: this.parameters.MessageName,
      Stage: this.parameters.Stage,
      SourceBooking: this.parameters.SourceBooking,
      SourcePreImageBooking: this.parameters.SourcePreImageBooking,
      SourceRelatedBookingsCreate: this.parameters.SourceRelatedBookingsCreate,
      SourceRelatedBookingsUpdate: this.parameters.SourceRelatedBookingsUpdate,
      SourceRelatedBookingsDelete: this.parameters.SourceRelatedBookingsDelete,
      SourcePreImageRelatedBookingsUpdate: this.parameters.SourcePreImageRelatedBookingsUpdate,
      SourcePreImageRelatedBookingsDelete: this.parameters.SourcePreImageRelatedBookingsDelete,
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

  async parseResponse(response: Response): Promise<msdyn_CascadeBookingChangesResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_CascadeBookingChangesResponse;
  }
}
