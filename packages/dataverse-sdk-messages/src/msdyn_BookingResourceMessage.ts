import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_BookingResource request message
 *
 * Web API Action: msdyn_BookingResource
 */
export class msdyn_BookingResourceRequest
  extends OrganizationRequest
  implements Executable<msdyn_BookingResourceResponse>
{
  constructor(
    public subcontractLineId: string,
    public subcontractId: string,
    public distributeEvenlyBehavior: number,
    public newStartDateTime: string,
    public newResourceId: string,
    public newTravelTime: number,
    public newDistance: number,
    public resourceId: string,
    public requirementId: string,
    public work: EntityReference,
    public bookingStatusId: string,
    public bookingMethod: number,
    public bookingType: number,
    public schedules: string,
    public timeframe: number,
    public hours: number,
    public percentage: number,
    public distributeMethod: number,
    public bookingIds: string,
    public defaultBookingHeader: EntityReference,
    public defaultBookingDetail: EntityReference,
    public reloadStartDate: string,
    public reloadEndDate: string,
    public reloadDetailBookings: boolean,
    public timeZoneCode: number,
    public schedulerSettings: string,
    public preventPartialFulfillment: boolean,
    public allowDoubleBooking: boolean,
    public cancelExistingBooking: boolean,
    public uRSInternalFlags: string,
    public considerAppointments: boolean,
    public ignoreTimeZone: boolean,
    public bookingDetails: Record<string, unknown>[]
  ) {
    super("msdyn_BookingResource");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BookingResource`;

    const body: Record<string, unknown> = {
      SubcontractLineId: this.subcontractLineId,
      SubcontractId: this.subcontractId,
      DistributeEvenlyBehavior: this.distributeEvenlyBehavior,
      NewStartDateTime: this.newStartDateTime,
      NewResourceId: this.newResourceId,
      NewTravelTime: this.newTravelTime,
      NewDistance: this.newDistance,
      ResourceId: this.resourceId,
      RequirementId: this.requirementId,
      Work: this.work,
      BookingStatusId: this.bookingStatusId,
      BookingMethod: this.bookingMethod,
      BookingType: this.bookingType,
      Schedules: this.schedules,
      Timeframe: this.timeframe,
      Hours: this.hours,
      Percentage: this.percentage,
      DistributeMethod: this.distributeMethod,
      BookingIds: this.bookingIds,
      DefaultBookingHeader: this.defaultBookingHeader,
      DefaultBookingDetail: this.defaultBookingDetail,
      ReloadStartDate: this.reloadStartDate,
      ReloadEndDate: this.reloadEndDate,
      ReloadDetailBookings: this.reloadDetailBookings,
      TimeZoneCode: this.timeZoneCode,
      SchedulerSettings: this.schedulerSettings,
      PreventPartialFulfillment: this.preventPartialFulfillment,
      AllowDoubleBooking: this.allowDoubleBooking,
      CancelExistingBooking: this.cancelExistingBooking,
      URSInternalFlags: this.uRSInternalFlags,
      ConsiderAppointments: this.considerAppointments,
      IgnoreTimeZone: this.ignoreTimeZone,
      BookingDetails: this.bookingDetails,
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

  async parseResponse(response: Response): Promise<msdyn_BookingResourceResponse> {
    const data = await response.json();
    return msdyn_BookingResourceResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      SubcontractLineId: this.subcontractLineId,
      SubcontractId: this.subcontractId,
      DistributeEvenlyBehavior: this.distributeEvenlyBehavior,
      NewStartDateTime: this.newStartDateTime,
      NewResourceId: this.newResourceId,
      NewTravelTime: this.newTravelTime,
      NewDistance: this.newDistance,
      ResourceId: this.resourceId,
      RequirementId: this.requirementId,
      Work: this.work,
      BookingStatusId: this.bookingStatusId,
      BookingMethod: this.bookingMethod,
      BookingType: this.bookingType,
      Schedules: this.schedules,
      Timeframe: this.timeframe,
      Hours: this.hours,
      Percentage: this.percentage,
      DistributeMethod: this.distributeMethod,
      BookingIds: this.bookingIds,
      DefaultBookingHeader: this.defaultBookingHeader,
      DefaultBookingDetail: this.defaultBookingDetail,
      ReloadStartDate: this.reloadStartDate,
      ReloadEndDate: this.reloadEndDate,
      ReloadDetailBookings: this.reloadDetailBookings,
      TimeZoneCode: this.timeZoneCode,
      SchedulerSettings: this.schedulerSettings,
      PreventPartialFulfillment: this.preventPartialFulfillment,
      AllowDoubleBooking: this.allowDoubleBooking,
      CancelExistingBooking: this.cancelExistingBooking,
      URSInternalFlags: this.uRSInternalFlags,
      ConsiderAppointments: this.considerAppointments,
      IgnoreTimeZone: this.ignoreTimeZone,
      BookingDetails: this.bookingDetails,
    };
  }
}

/**
 * msdyn_BookingResource response message
 */
export class msdyn_BookingResourceResponse extends OrganizationResponse {
  constructor(public result: msdyn_BookingResourceResponse) {
    super("msdyn_BookingResource");
  }

  static fromResponse(data: unknown): msdyn_BookingResourceResponse {
    return new msdyn_BookingResourceResponse((data as any).value);
  }
}
