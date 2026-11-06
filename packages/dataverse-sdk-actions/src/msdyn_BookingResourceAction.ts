import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_BookingResource action
 */
export interface msdyn_BookingResourceResponse {
  BookingResult: string;
}

/**
 * Parameters of the msdyn_BookingResource action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BookingResourceActionParameters {
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
  BookingDetails?: Record<string, unknown>[];
}

/**
 * msdyn_BookingResource action
 *
 * Unbound action
 */
export class msdyn_BookingResourceAction implements Executable<msdyn_BookingResourceResponse> {
  constructor(public readonly parameters: msdyn_BookingResourceActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BookingResource`;

    const body = requestBody({
      SubcontractLineId: this.parameters.SubcontractLineId,
      SubcontractId: this.parameters.SubcontractId,
      DistributeEvenlyBehavior: this.parameters.DistributeEvenlyBehavior,
      NewStartDateTime: this.parameters.NewStartDateTime,
      NewResourceId: this.parameters.NewResourceId,
      NewTravelTime: this.parameters.NewTravelTime,
      NewDistance: this.parameters.NewDistance,
      ResourceId: this.parameters.ResourceId,
      RequirementId: this.parameters.RequirementId,
      Work: this.parameters.Work,
      BookingStatusId: this.parameters.BookingStatusId,
      BookingMethod: this.parameters.BookingMethod,
      BookingType: this.parameters.BookingType,
      Schedules: this.parameters.Schedules,
      Timeframe: this.parameters.Timeframe,
      Hours: this.parameters.Hours,
      Percentage: this.parameters.Percentage,
      DistributeMethod: this.parameters.DistributeMethod,
      BookingIds: this.parameters.BookingIds,
      DefaultBookingHeader: this.parameters.DefaultBookingHeader,
      DefaultBookingDetail: this.parameters.DefaultBookingDetail,
      ReloadStartDate: this.parameters.ReloadStartDate,
      ReloadEndDate: this.parameters.ReloadEndDate,
      ReloadDetailBookings: this.parameters.ReloadDetailBookings,
      TimeZoneCode: this.parameters.TimeZoneCode,
      SchedulerSettings: this.parameters.SchedulerSettings,
      PreventPartialFulfillment: this.parameters.PreventPartialFulfillment,
      AllowDoubleBooking: this.parameters.AllowDoubleBooking,
      CancelExistingBooking: this.parameters.CancelExistingBooking,
      URSInternalFlags: this.parameters.URSInternalFlags,
      ConsiderAppointments: this.parameters.ConsiderAppointments,
      IgnoreTimeZone: this.parameters.IgnoreTimeZone,
      BookingDetails: this.parameters.BookingDetails,
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

  async parseResponse(response: Response): Promise<msdyn_BookingResourceResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as msdyn_BookingResourceResponse;
    return (await response.json()) as msdyn_BookingResourceResponse;
  }
}
