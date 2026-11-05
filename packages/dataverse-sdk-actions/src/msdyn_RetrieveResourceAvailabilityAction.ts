import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { msdyn_timegroup } from "./types/index.js";

/**
 * Response from msdyn_RetrieveResourceAvailability action
 */
export interface msdyn_RetrieveResourceAvailabilityResponse {
  ExceptionMessage: string;
}

/**
 * msdyn_RetrieveResourceAvailability action
 *
 * Unbound action
 */
export class msdyn_RetrieveResourceAvailabilityAction implements Executable<msdyn_RetrieveResourceAvailabilityResponse> {
  constructor(
    public readonly workOrder: EntityReference,
    public readonly realTimeMode: boolean,
    public readonly duration: number,
    public readonly forceDateRange: boolean,
    public readonly ignoreDuration: boolean,
    public readonly ignoreTravelTime: boolean,
    public readonly allowOverlapping: boolean,
    public readonly radius: number,
    public readonly startTime: string,
    public readonly endTime: string,
    public readonly timeGroup: msdyn_timegroup,
    public readonly calendar: string,
    public readonly characteristics: Record<string, unknown>[],
    public readonly territories: Record<string, unknown>[],
    public readonly resourceTypes: Record<string, unknown>[],
    public readonly resources: Record<string, unknown>[],
    public readonly restrictedResources: Record<string, unknown>[],
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly categories: Record<string, unknown>[],
    public readonly organizationalUnits: Record<string, unknown>[],
    public readonly teams: Record<string, unknown>[],
    public readonly businessUnits: Record<string, unknown>[]
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_RetrieveResourceAvailability`;

    const body: Record<string, unknown> = {
      WorkOrder: this.workOrder,
      RealTimeMode: this.realTimeMode,
      Duration: this.duration,
      ForceDateRange: this.forceDateRange,
      IgnoreDuration: this.ignoreDuration,
      IgnoreTravelTime: this.ignoreTravelTime,
      AllowOverlapping: this.allowOverlapping,
      Radius: this.radius,
      StartTime: this.startTime,
      EndTime: this.endTime,
      TimeGroup: this.timeGroup,
      Calendar: this.calendar,
      Characteristics: this.characteristics,
      Territories: this.territories,
      ResourceTypes: this.resourceTypes,
      Resources: this.resources,
      RestrictedResources: this.restrictedResources,
      Latitude: this.latitude,
      Longitude: this.longitude,
      Categories: this.categories,
      OrganizationalUnits: this.organizationalUnits,
      Teams: this.teams,
      BusinessUnits: this.businessUnits,
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

  async parseResponse(response: Response): Promise<msdyn_RetrieveResourceAvailabilityResponse> {
    const data = await response.json();
    return data as msdyn_RetrieveResourceAvailabilityResponse;
  }
}
