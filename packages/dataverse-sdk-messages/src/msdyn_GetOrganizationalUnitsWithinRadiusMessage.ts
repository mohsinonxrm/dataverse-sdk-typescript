import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_GetOrganizationalUnitsWithinRadiusResponse as msdyn_GetOrganizationalUnitsWithinRadiusResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204)
      return msdyn_GetOrganizationalUnitsWithinRadiusResponse.fromResponse({});
    return msdyn_GetOrganizationalUnitsWithinRadiusResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_GetOrganizationalUnitsWithinRadius response message
 */
export class msdyn_GetOrganizationalUnitsWithinRadiusResponse extends OrganizationResponse {
  constructor(public result: msdyn_GetOrganizationalUnitsWithinRadiusResponseData) {
    super("msdyn_GetOrganizationalUnitsWithinRadius");
  }

  static fromResponse(data: unknown): msdyn_GetOrganizationalUnitsWithinRadiusResponse {
    return new msdyn_GetOrganizationalUnitsWithinRadiusResponse(
      responseObject<msdyn_GetOrganizationalUnitsWithinRadiusResponseData>(data)
    );
  }
}
