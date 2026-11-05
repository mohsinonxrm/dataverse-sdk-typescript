import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_GetOrganizationalUnitsWithinRadius request message
 *
 * Web API Action: msdyn_GetOrganizationalUnitsWithinRadius
 */
export class msdyn_GetOrganizationalUnitsWithinRadiusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrganizationalUnitsWithinRadiusResponse>
{
  constructor(
    public version: string,
    public latitude: number,
    public longitude: number,
    public radius: number,
    public unit: number,
    public eligibleOrganizationlUnitIds: Record<string, unknown>[],
    public additionalCustomInput: EntityReference
  ) {
    super("msdyn_GetOrganizationalUnitsWithinRadius");
  }

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
    return msdyn_GetOrganizationalUnitsWithinRadiusResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Version: this.version,
      Latitude: this.latitude,
      Longitude: this.longitude,
      Radius: this.radius,
      Unit: this.unit,
      EligibleOrganizationlUnitIds: this.eligibleOrganizationlUnitIds,
      AdditionalCustomInput: this.additionalCustomInput,
    };
  }
}

/**
 * msdyn_GetOrganizationalUnitsWithinRadius response message
 */
export class msdyn_GetOrganizationalUnitsWithinRadiusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrganizationalUnitsWithinRadiusResponse) {
    super("msdyn_GetOrganizationalUnitsWithinRadius");
  }

  static fromResponse(data: unknown): msdyn_GetOrganizationalUnitsWithinRadiusResponse {
    return new msdyn_GetOrganizationalUnitsWithinRadiusResponse((data as any).value);
  }
}
