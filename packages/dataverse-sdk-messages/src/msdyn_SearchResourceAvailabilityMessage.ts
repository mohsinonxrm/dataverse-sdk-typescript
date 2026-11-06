import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Parameters of the msdyn_SearchResourceAvailability message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SearchResourceAvailabilityRequestParameters {
  Version?: string;
  IsWebApi?: boolean;
  Requirement: EntityReference | AnyEntityPayload;
  Settings: EntityReference | AnyEntityPayload;
  ResourceSpecification?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SearchResourceAvailability request message
 *
 * Web API Action: msdyn_SearchResourceAvailability
 */
export class msdyn_SearchResourceAvailabilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_SearchResourceAvailabilityResponse>
{
  declare readonly Parameters: Readonly<msdyn_SearchResourceAvailabilityRequestParameters>;

  constructor(parameters: msdyn_SearchResourceAvailabilityRequestParameters) {
    super("msdyn_SearchResourceAvailability", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SearchResourceAvailability`;

    const body = requestBody({
      Version: this.Parameters.Version,
      IsWebApi: this.Parameters.IsWebApi,
      Requirement: this.Parameters.Requirement,
      Settings: this.Parameters.Settings,
      ResourceSpecification: this.Parameters.ResourceSpecification,
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

  async parseResponse(response: Response): Promise<msdyn_SearchResourceAvailabilityResponse> {
    // The body is the complex value, with its @odata.context
    return msdyn_SearchResourceAvailabilityResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the msdyn_SearchResourceAvailability action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SearchResourceAvailabilityResult {
  "@odata.context"?: string;
}

/**
 * msdyn_SearchResourceAvailability response message
 *
 * `result` is the value the msdyn_SearchResourceAvailability action returns (see {@link msdyn_SearchResourceAvailabilityResult}).
 */
export class msdyn_SearchResourceAvailabilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_SearchResourceAvailabilityResult) {
    super("msdyn_SearchResourceAvailability");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): msdyn_SearchResourceAvailabilityResponse {
    return new msdyn_SearchResourceAvailabilityResponse(
      data as msdyn_SearchResourceAvailabilityResult
    );
  }
}
