import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_RetrieveResourceAvailabilityResponse as msdyn_RetrieveResourceAvailabilityResponseData,
  msdyn_timegroup,
} from "./types/index.js";

/**
 * Parameters of the msdyn_RetrieveResourceAvailability message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveResourceAvailabilityRequestParameters {
  WorkOrder?: EntityReference | AnyEntityPayload;
  RealTimeMode: boolean;
  Duration: number;
  ForceDateRange?: boolean;
  IgnoreDuration: boolean;
  IgnoreTravelTime: boolean;
  AllowOverlapping: boolean;
  Radius: number;
  StartTime: string;
  EndTime: string;
  TimeGroup?: EntityReference | EntityPayload<msdyn_timegroup>;
  Calendar?: string;
  Characteristics?: Record<string, unknown>[];
  Territories?: Record<string, unknown>[];
  ResourceTypes?: Record<string, unknown>[];
  Resources?: Record<string, unknown>[];
  RestrictedResources?: Record<string, unknown>[];
  Latitude?: number;
  Longitude?: number;
  Categories?: Record<string, unknown>[];
  OrganizationalUnits?: Record<string, unknown>[];
  Teams?: Record<string, unknown>[];
  BusinessUnits?: Record<string, unknown>[];
}

/**
 * msdyn_RetrieveResourceAvailability request message
 *
 * Web API Action: msdyn_RetrieveResourceAvailability
 */
export class msdyn_RetrieveResourceAvailabilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveResourceAvailabilityResponse>
{
  declare readonly Parameters: Readonly<msdyn_RetrieveResourceAvailabilityRequestParameters>;

  constructor(parameters: msdyn_RetrieveResourceAvailabilityRequestParameters) {
    super("msdyn_RetrieveResourceAvailability", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveResourceAvailability`;

    const body = requestBody({
      WorkOrder: this.Parameters.WorkOrder,
      RealTimeMode: this.Parameters.RealTimeMode,
      Duration: this.Parameters.Duration,
      ForceDateRange: this.Parameters.ForceDateRange,
      IgnoreDuration: this.Parameters.IgnoreDuration,
      IgnoreTravelTime: this.Parameters.IgnoreTravelTime,
      AllowOverlapping: this.Parameters.AllowOverlapping,
      Radius: this.Parameters.Radius,
      StartTime: this.Parameters.StartTime,
      EndTime: this.Parameters.EndTime,
      TimeGroup: this.Parameters.TimeGroup,
      Calendar: this.Parameters.Calendar,
      Characteristics: this.Parameters.Characteristics,
      Territories: this.Parameters.Territories,
      ResourceTypes: this.Parameters.ResourceTypes,
      Resources: this.Parameters.Resources,
      RestrictedResources: this.Parameters.RestrictedResources,
      Latitude: this.Parameters.Latitude,
      Longitude: this.Parameters.Longitude,
      Categories: this.Parameters.Categories,
      OrganizationalUnits: this.Parameters.OrganizationalUnits,
      Teams: this.Parameters.Teams,
      BusinessUnits: this.Parameters.BusinessUnits,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveResourceAvailabilityResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_RetrieveResourceAvailabilityResponse.fromResponse({});
    return msdyn_RetrieveResourceAvailabilityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_RetrieveResourceAvailability response message
 */
export class msdyn_RetrieveResourceAvailabilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_RetrieveResourceAvailabilityResponseData) {
    super("msdyn_RetrieveResourceAvailability");
  }

  static fromResponse(data: unknown): msdyn_RetrieveResourceAvailabilityResponse {
    return new msdyn_RetrieveResourceAvailabilityResponse(
      responseObject<msdyn_RetrieveResourceAvailabilityResponseData>(data)
    );
  }
}
