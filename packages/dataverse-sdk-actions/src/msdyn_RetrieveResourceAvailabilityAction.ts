import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type { msdyn_timegroup } from "./types/index.js";

/**
 * Response from msdyn_RetrieveResourceAvailability action
 */
export interface msdyn_RetrieveResourceAvailabilityResponse {
  ExceptionMessage: string;
}

/**
 * Parameters of the msdyn_RetrieveResourceAvailability action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_RetrieveResourceAvailabilityActionParameters {
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
 * msdyn_RetrieveResourceAvailability action
 *
 * Unbound action
 */
export class msdyn_RetrieveResourceAvailabilityAction implements Executable<msdyn_RetrieveResourceAvailabilityResponse> {
  constructor(public readonly parameters: msdyn_RetrieveResourceAvailabilityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveResourceAvailability`;

    const body = requestBody({
      WorkOrder: this.parameters.WorkOrder,
      RealTimeMode: this.parameters.RealTimeMode,
      Duration: this.parameters.Duration,
      ForceDateRange: this.parameters.ForceDateRange,
      IgnoreDuration: this.parameters.IgnoreDuration,
      IgnoreTravelTime: this.parameters.IgnoreTravelTime,
      AllowOverlapping: this.parameters.AllowOverlapping,
      Radius: this.parameters.Radius,
      StartTime: this.parameters.StartTime,
      EndTime: this.parameters.EndTime,
      TimeGroup: this.parameters.TimeGroup,
      Calendar: this.parameters.Calendar,
      Characteristics: this.parameters.Characteristics,
      Territories: this.parameters.Territories,
      ResourceTypes: this.parameters.ResourceTypes,
      Resources: this.parameters.Resources,
      RestrictedResources: this.parameters.RestrictedResources,
      Latitude: this.parameters.Latitude,
      Longitude: this.parameters.Longitude,
      Categories: this.parameters.Categories,
      OrganizationalUnits: this.parameters.OrganizationalUnits,
      Teams: this.parameters.Teams,
      BusinessUnits: this.parameters.BusinessUnits,
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return (text ? JSON.parse(text) : {}) as msdyn_RetrieveResourceAvailabilityResponse;
  }
}
