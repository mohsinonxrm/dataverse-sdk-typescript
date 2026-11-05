import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { msdyn_CascadeBookingChangesResponse as msdyn_CascadeBookingChangesResponseData } from "./types/index.js";

/**
 * msdyn_CascadeBookingChanges request message
 *
 * Web API Action: msdyn_CascadeBookingChanges
 */
export class msdyn_CascadeBookingChangesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CascadeBookingChangesResponse>
{
  constructor(
    public messageName: string,
    public stage: number,
    public sourceBooking: EntityReference,
    public sourcePreImageBooking: EntityReference,
    public sourceRelatedBookingsCreate: Record<string, unknown>[],
    public sourceRelatedBookingsUpdate: Record<string, unknown>[],
    public sourceRelatedBookingsDelete: Record<string, unknown>[],
    public sourcePreImageRelatedBookingsUpdate: Record<string, unknown>[],
    public sourcePreImageRelatedBookingsDelete: Record<string, unknown>[]
  ) {
    super("msdyn_CascadeBookingChanges");
  }

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
    return msdyn_CascadeBookingChangesResponse.fromResponse(data);
  }
}

/**
 * msdyn_CascadeBookingChanges response message
 */
export class msdyn_CascadeBookingChangesResponse extends OrganizationResponse {
  constructor(public result: msdyn_CascadeBookingChangesResponseData) {
    super("msdyn_CascadeBookingChanges");
  }

  static fromResponse(data: unknown): msdyn_CascadeBookingChangesResponse {
    return new msdyn_CascadeBookingChangesResponse(
      responseObject<msdyn_CascadeBookingChangesResponseData>(data)
    );
  }
}
