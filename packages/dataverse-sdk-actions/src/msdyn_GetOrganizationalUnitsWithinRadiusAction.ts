import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_GetOrganizationalUnitsWithinRadius action
 */
export interface msdyn_GetOrganizationalUnitsWithinRadiusResponse {
  DistanceUnit: number;
  ExceptionMessage: string;
}

/**
 * msdyn_GetOrganizationalUnitsWithinRadius action
 *
 * Unbound action
 */
export class msdyn_GetOrganizationalUnitsWithinRadiusAction implements Executable<msdyn_GetOrganizationalUnitsWithinRadiusResponse> {
  constructor(
    public readonly version: string | undefined,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly radius: number,
    public readonly unit: number,
    public readonly eligibleOrganizationlUnitIds?: Record<string, unknown>[],
    public readonly additionalCustomInput?: EntityReference | AnyEntityPayload
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrganizationalUnitsWithinRadius`;

    const body: Record<string, unknown> = {
      Version: this.version,
      Latitude: this.latitude,
      Longitude: this.longitude,
      Radius: this.radius,
      Unit: this.unit,
      EligibleOrganizationlUnitIds: this.eligibleOrganizationlUnitIds,
      AdditionalCustomInput: this.additionalCustomInput,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetOrganizationalUnitsWithinRadiusResponse> {
    const data = await response.json();
    return data as msdyn_GetOrganizationalUnitsWithinRadiusResponse;
  }
}
