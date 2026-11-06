import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { AnyEntityPayload, EntityPayload } from "./types/EntityPayload.js";
import type {
  msdyn_RetrieveResourceAvailabilityResponse as msdyn_RetrieveResourceAvailabilityResponseData,
  msdyn_timegroup,
} from "./types/index.js";

/**
 * msdyn_RetrieveResourceAvailability request message
 *
 * Web API Action: msdyn_RetrieveResourceAvailability
 */
export class msdyn_RetrieveResourceAvailabilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_RetrieveResourceAvailabilityResponse>
{
  constructor(
    public workOrder: EntityReference | AnyEntityPayload | undefined,
    public realTimeMode: boolean,
    public duration: number,
    public forceDateRange: boolean | undefined,
    public ignoreDuration: boolean,
    public ignoreTravelTime: boolean,
    public allowOverlapping: boolean,
    public radius: number,
    public startTime: string,
    public endTime: string,
    public timeGroup?: EntityReference | EntityPayload<msdyn_timegroup>,
    public calendar?: string,
    public characteristics?: Record<string, unknown>[],
    public territories?: Record<string, unknown>[],
    public resourceTypes?: Record<string, unknown>[],
    public resources?: Record<string, unknown>[],
    public restrictedResources?: Record<string, unknown>[],
    public latitude?: number,
    public longitude?: number,
    public categories?: Record<string, unknown>[],
    public organizationalUnits?: Record<string, unknown>[],
    public teams?: Record<string, unknown>[],
    public businessUnits?: Record<string, unknown>[]
  ) {
    super("msdyn_RetrieveResourceAvailability");
  }

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
    return msdyn_RetrieveResourceAvailabilityResponse.fromResponse(data);
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
