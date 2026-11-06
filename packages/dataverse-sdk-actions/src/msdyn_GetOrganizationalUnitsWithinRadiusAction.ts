import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_GetOrganizationalUnitsWithinRadius action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrganizationalUnitsWithinRadiusResponse {
  "@odata.context"?: string;
  DistanceUnit: number;
  ExceptionMessage: string;
}

/**
 * Parameters of the msdyn_GetOrganizationalUnitsWithinRadius action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOrganizationalUnitsWithinRadiusActionParameters {
  Version?: string;
  Latitude: number;
  Longitude: number;
  Radius: number;
  Unit: number;
  EligibleOrganizationlUnitIds?: Record<string, unknown>[];
  AdditionalCustomInput?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetOrganizationalUnitsWithinRadius action
 *
 * Unbound action
 */
export class msdyn_GetOrganizationalUnitsWithinRadiusAction implements Executable<msdyn_GetOrganizationalUnitsWithinRadiusResponse> {
  constructor(
    public readonly parameters: msdyn_GetOrganizationalUnitsWithinRadiusActionParameters
  ) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrganizationalUnitsWithinRadius`;

    const body = requestBody({
      Version: this.parameters.Version,
      Latitude: this.parameters.Latitude,
      Longitude: this.parameters.Longitude,
      Radius: this.parameters.Radius,
      Unit: this.parameters.Unit,
      EligibleOrganizationlUnitIds: this.parameters.EligibleOrganizationlUnitIds,
      AdditionalCustomInput: this.parameters.AdditionalCustomInput,
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

  async parseResponse(
    response: Response
  ): Promise<msdyn_GetOrganizationalUnitsWithinRadiusResponse> {
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_GetOrganizationalUnitsWithinRadiusResponse;
  }
}
