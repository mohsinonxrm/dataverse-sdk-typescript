import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SimulateBookingResource message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SimulateBookingResourceRequestParameters {
  SubcontractLineId?: string;
  SubcontractId?: string;
  DistributeEvenlyBehavior?: number;
  NewStartDateTime?: string;
  NewResourceId?: string;
  NewTravelTime?: number;
  NewDistance?: number;
  ResourceId: string;
  RequirementId?: string;
  Work?: EntityReference | AnyEntityPayload;
  BookingStatusId: string;
  BookingMethod: number;
  BookingType: number;
  Schedules: string;
  Timeframe: number;
  Hours?: number;
  Percentage?: number;
  DistributeMethod?: number;
  BookingIds?: string;
  DefaultBookingHeader?: EntityReference | AnyEntityPayload;
  DefaultBookingDetail?: EntityReference | AnyEntityPayload;
  ReloadStartDate?: string;
  ReloadEndDate?: string;
  ReloadDetailBookings?: boolean;
  TimeZoneCode?: number;
  SchedulerSettings?: string;
  PreventPartialFulfillment?: boolean;
  AllowDoubleBooking?: boolean;
  CancelExistingBooking?: boolean;
  URSInternalFlags?: string;
  ConsiderAppointments?: boolean;
  IgnoreTimeZone?: boolean;
}

/**
 * msdyn_SimulateBookingResource request message
 *
 * Web API Action: msdyn_SimulateBookingResource
 */
export class msdyn_SimulateBookingResourceRequest
  extends OrganizationRequest
  implements Executable<msdyn_SimulateBookingResourceResponse>
{
  declare readonly Parameters: Readonly<msdyn_SimulateBookingResourceRequestParameters>;

  constructor(parameters: msdyn_SimulateBookingResourceRequestParameters) {
    super("msdyn_SimulateBookingResource", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SimulateBookingResource`;

    const body = requestBody({
      SubcontractLineId: this.Parameters.SubcontractLineId,
      SubcontractId: this.Parameters.SubcontractId,
      DistributeEvenlyBehavior: this.Parameters.DistributeEvenlyBehavior,
      NewStartDateTime: this.Parameters.NewStartDateTime,
      NewResourceId: this.Parameters.NewResourceId,
      NewTravelTime: this.Parameters.NewTravelTime,
      NewDistance: this.Parameters.NewDistance,
      ResourceId: this.Parameters.ResourceId,
      RequirementId: this.Parameters.RequirementId,
      Work: this.Parameters.Work,
      BookingStatusId: this.Parameters.BookingStatusId,
      BookingMethod: this.Parameters.BookingMethod,
      BookingType: this.Parameters.BookingType,
      Schedules: this.Parameters.Schedules,
      Timeframe: this.Parameters.Timeframe,
      Hours: this.Parameters.Hours,
      Percentage: this.Parameters.Percentage,
      DistributeMethod: this.Parameters.DistributeMethod,
      BookingIds: this.Parameters.BookingIds,
      DefaultBookingHeader: this.Parameters.DefaultBookingHeader,
      DefaultBookingDetail: this.Parameters.DefaultBookingDetail,
      ReloadStartDate: this.Parameters.ReloadStartDate,
      ReloadEndDate: this.Parameters.ReloadEndDate,
      ReloadDetailBookings: this.Parameters.ReloadDetailBookings,
      TimeZoneCode: this.Parameters.TimeZoneCode,
      SchedulerSettings: this.Parameters.SchedulerSettings,
      PreventPartialFulfillment: this.Parameters.PreventPartialFulfillment,
      AllowDoubleBooking: this.Parameters.AllowDoubleBooking,
      CancelExistingBooking: this.Parameters.CancelExistingBooking,
      URSInternalFlags: this.Parameters.URSInternalFlags,
      ConsiderAppointments: this.Parameters.ConsiderAppointments,
      IgnoreTimeZone: this.Parameters.IgnoreTimeZone,
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

  async parseResponse(response: Response): Promise<msdyn_SimulateBookingResourceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SimulateBookingResourceResponse.fromResponse({});
    return msdyn_SimulateBookingResourceResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SimulateBookingResource response message
 */
export class msdyn_SimulateBookingResourceResponse extends OrganizationResponse {
  constructor(public result: Record<string, unknown>[]) {
    super("msdyn_SimulateBookingResource");
  }

  static fromResponse(data: unknown): msdyn_SimulateBookingResourceResponse {
    return new msdyn_SimulateBookingResourceResponse(
      responseValue<Record<string, unknown>[]>(data)
    );
  }
}
