import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_BookingResourceResponse as msdyn_BookingResourceResponseData } from "./types/index.js";

/**
 * Parameters of the msdyn_BookingResource message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_BookingResourceRequestParameters {
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
 * msdyn_BookingResource request message
 *
 * Web API Action: msdyn_BookingResource
 */
export class msdyn_BookingResourceRequest
  extends OrganizationRequest
  implements Executable<msdyn_BookingResourceResponse>
{
  declare readonly Parameters: Readonly<msdyn_BookingResourceRequestParameters>;

  constructor(parameters: msdyn_BookingResourceRequestParameters) {
    super("msdyn_BookingResource", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_BookingResource`;

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
      BookingDetails: this.Parameters.BookingDetails,
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
    if (response.status === 204) return msdyn_BookingResourceResponse.fromResponse({});
    return msdyn_BookingResourceResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_BookingResource response message
 */
export class msdyn_BookingResourceResponse extends OrganizationResponse {
  constructor(public result: msdyn_BookingResourceResponseData) {
    super("msdyn_BookingResource");
  }

  static fromResponse(data: unknown): msdyn_BookingResourceResponse {
    return new msdyn_BookingResourceResponse(
      responseObject<msdyn_BookingResourceResponseData>(data)
    );
  }
}
