import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_CascadeBookingChanges action
 */
export interface msdyn_CascadeBookingChangesResponse {}

/**
 * msdyn_CascadeBookingChanges action
 *
 * Unbound action
 */
export class msdyn_CascadeBookingChangesAction implements Executable<msdyn_CascadeBookingChangesResponse> {
  constructor(
    public readonly messageName: string,
    public readonly stage: number,
    public readonly sourceBooking: EntityReference | AnyEntityPayload,
    public readonly sourcePreImageBooking?: EntityReference | AnyEntityPayload,
    public readonly sourceRelatedBookingsCreate?: Record<string, unknown>[],
    public readonly sourceRelatedBookingsUpdate?: Record<string, unknown>[],
    public readonly sourceRelatedBookingsDelete?: Record<string, unknown>[],
    public readonly sourcePreImageRelatedBookingsUpdate?: Record<string, unknown>[],
    public readonly sourcePreImageRelatedBookingsDelete?: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeBookingChanges`;

    const body: Record<string, unknown> = {
      MessageName: this.messageName,
      Stage: this.stage,
      SourceBooking: this.sourceBooking,
      SourcePreImageBooking: this.sourcePreImageBooking,
      SourceRelatedBookingsCreate: this.sourceRelatedBookingsCreate,
      SourceRelatedBookingsUpdate: this.sourceRelatedBookingsUpdate,
      SourceRelatedBookingsDelete: this.sourceRelatedBookingsDelete,
      SourcePreImageRelatedBookingsUpdate: this.sourcePreImageRelatedBookingsUpdate,
      SourcePreImageRelatedBookingsDelete: this.sourcePreImageRelatedBookingsDelete,
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

  async parseResponse(response: Response): Promise<msdyn_CascadeBookingChangesResponse> {
    const data = await response.json();
    return data as msdyn_CascadeBookingChangesResponse;
  }
}
