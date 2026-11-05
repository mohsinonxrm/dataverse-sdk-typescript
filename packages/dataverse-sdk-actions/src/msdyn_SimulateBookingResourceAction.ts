import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";

/**
 * Response from msdyn_SimulateBookingResource action
 */
export interface msdyn_SimulateBookingResourceResponse {
  value: EntityReference[];
}

/**
 * msdyn_SimulateBookingResource action
 *
 * Unbound action
 */
export class msdyn_SimulateBookingResourceAction implements Executable<msdyn_SimulateBookingResourceResponse> {
  constructor(
    public readonly subcontractLineId: string,
    public readonly subcontractId: string,
    public readonly distributeEvenlyBehavior: number,
    public readonly newStartDateTime: string,
    public readonly newResourceId: string,
    public readonly newTravelTime: number,
    public readonly newDistance: number,
    public readonly resourceId: string,
    public readonly requirementId: string,
    public readonly work: EntityReference,
    public readonly bookingStatusId: string,
    public readonly bookingMethod: number,
    public readonly bookingType: number,
    public readonly schedules: string,
    public readonly timeframe: number,
    public readonly hours: number,
    public readonly percentage: number,
    public readonly distributeMethod: number,
    public readonly bookingIds: string,
    public readonly defaultBookingHeader: EntityReference,
    public readonly defaultBookingDetail: EntityReference,
    public readonly reloadStartDate: string,
    public readonly reloadEndDate: string,
    public readonly reloadDetailBookings: boolean,
    public readonly timeZoneCode: number,
    public readonly schedulerSettings: string,
    public readonly preventPartialFulfillment: boolean,
    public readonly allowDoubleBooking: boolean,
    public readonly cancelExistingBooking: boolean,
    public readonly uRSInternalFlags: string,
    public readonly considerAppointments: boolean,
    public readonly ignoreTimeZone: boolean
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SimulateBookingResource`;

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

  async parseResponse(response: Response): Promise<msdyn_SimulateBookingResourceResponse> {
    const data = await response.json();
    return data as msdyn_SimulateBookingResourceResponse;
  }
}
