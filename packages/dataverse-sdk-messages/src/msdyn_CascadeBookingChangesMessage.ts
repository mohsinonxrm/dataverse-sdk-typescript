import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_CascadeBookingChangesResponse as msdyn_CascadeBookingChangesResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_CascadeBookingChanges message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_CascadeBookingChangesRequestParameters {
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
 * msdyn_CascadeBookingChanges request message
 *
 * Web API Action: msdyn_CascadeBookingChanges
 */
export class msdyn_CascadeBookingChangesRequest
  extends OrganizationRequest
  implements Executable<msdyn_CascadeBookingChangesResponse>
{
  declare readonly Parameters: Readonly<msdyn_CascadeBookingChangesRequestParameters>;

  constructor(parameters: msdyn_CascadeBookingChangesRequestParameters) {
    super("msdyn_CascadeBookingChanges", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_CascadeBookingChanges`;

    const body = requestBody({
      MessageName: this.Parameters.MessageName,
      Stage: this.Parameters.Stage,
      SourceBooking: this.Parameters.SourceBooking,
      SourcePreImageBooking: this.Parameters.SourcePreImageBooking,
      SourceRelatedBookingsCreate: this.Parameters.SourceRelatedBookingsCreate,
      SourceRelatedBookingsUpdate: this.Parameters.SourceRelatedBookingsUpdate,
      SourceRelatedBookingsDelete: this.Parameters.SourceRelatedBookingsDelete,
      SourcePreImageRelatedBookingsUpdate: this.Parameters.SourcePreImageRelatedBookingsUpdate,
      SourcePreImageRelatedBookingsDelete: this.Parameters.SourcePreImageRelatedBookingsDelete,
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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_CascadeBookingChangesResponse.fromResponse({});
    return msdyn_CascadeBookingChangesResponse.fromResponse(await response.json());
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
