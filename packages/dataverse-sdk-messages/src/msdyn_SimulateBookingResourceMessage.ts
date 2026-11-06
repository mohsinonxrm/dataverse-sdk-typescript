import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseValue } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * msdyn_SimulateBookingResource request message
 *
 * Web API Action: msdyn_SimulateBookingResource
 */
export class msdyn_SimulateBookingResourceRequest
  extends OrganizationRequest
  implements Executable<msdyn_SimulateBookingResourceResponse>
{
  constructor(
    public subcontractLineId: string | undefined,
    public subcontractId: string | undefined,
    public distributeEvenlyBehavior: number | undefined,
    public newStartDateTime: string | undefined,
    public newResourceId: string | undefined,
    public newTravelTime: number | undefined,
    public newDistance: number | undefined,
    public resourceId: string,
    public requirementId: string | undefined,
    public work: EntityReference | AnyEntityPayload | undefined,
    public bookingStatusId: string,
    public bookingMethod: number,
    public bookingType: number,
    public schedules: string,
    public timeframe: number,
    public hours?: number,
    public percentage?: number,
    public distributeMethod?: number,
    public bookingIds?: string,
    public defaultBookingHeader?: EntityReference | AnyEntityPayload,
    public defaultBookingDetail?: EntityReference | AnyEntityPayload,
    public reloadStartDate?: string,
    public reloadEndDate?: string,
    public reloadDetailBookings?: boolean,
    public timeZoneCode?: number,
    public schedulerSettings?: string,
    public preventPartialFulfillment?: boolean,
    public allowDoubleBooking?: boolean,
    public cancelExistingBooking?: boolean,
    public uRSInternalFlags?: string,
    public considerAppointments?: boolean,
    public ignoreTimeZone?: boolean
  ) {
    super("msdyn_SimulateBookingResource");
  }

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
    return msdyn_SimulateBookingResourceResponse.fromResponse(data);
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
