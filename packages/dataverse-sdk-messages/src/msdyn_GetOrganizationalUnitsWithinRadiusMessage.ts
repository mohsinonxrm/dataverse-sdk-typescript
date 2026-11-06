import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_GetOrganizationalUnitsWithinRadius message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_GetOrganizationalUnitsWithinRadiusRequestParameters {
  Version?: string;
  Latitude: number;
  Longitude: number;
  Radius: number;
  Unit: number;
  EligibleOrganizationlUnitIds?: Record<string, unknown>[];
  AdditionalCustomInput?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_GetOrganizationalUnitsWithinRadius request message
 *
 * Web API Action: msdyn_GetOrganizationalUnitsWithinRadius
 */
export class msdyn_GetOrganizationalUnitsWithinRadiusRequest
  extends OrganizationRequest
  implements Executable<msdyn_GetOrganizationalUnitsWithinRadiusResponse>
{
  declare readonly Parameters: Readonly<msdyn_GetOrganizationalUnitsWithinRadiusRequestParameters>;

  constructor(parameters: msdyn_GetOrganizationalUnitsWithinRadiusRequestParameters) {
    super("msdyn_GetOrganizationalUnitsWithinRadius", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_GetOrganizationalUnitsWithinRadius`;

    const body = requestBody({
      Version: this.Parameters.Version,
      Latitude: this.Parameters.Latitude,
      Longitude: this.Parameters.Longitude,
      Radius: this.Parameters.Radius,
      Unit: this.Parameters.Unit,
      EligibleOrganizationlUnitIds: this.Parameters.EligibleOrganizationlUnitIds,
      AdditionalCustomInput: this.Parameters.AdditionalCustomInput,
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
    return msdyn_GetOrganizationalUnitsWithinRadiusResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_GetOrganizationalUnitsWithinRadius action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_GetOrganizationalUnitsWithinRadiusResult {
  "@odata.context"?: string;
  DistanceUnit: number;
  ExceptionMessage: string;
}

/**
 * msdyn_GetOrganizationalUnitsWithinRadius response message
 *
 * `result` is the value the msdyn_GetOrganizationalUnitsWithinRadius action returns (see {@link msdyn_GetOrganizationalUnitsWithinRadiusResult}).
 */
export class msdyn_GetOrganizationalUnitsWithinRadiusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrganizationalUnitsWithinRadiusResult) {
    super("msdyn_GetOrganizationalUnitsWithinRadius");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_GetOrganizationalUnitsWithinRadiusResponse {
    return new msdyn_GetOrganizationalUnitsWithinRadiusResponse(
      data as msdyn_GetOrganizationalUnitsWithinRadiusResult
    );
  }
}
