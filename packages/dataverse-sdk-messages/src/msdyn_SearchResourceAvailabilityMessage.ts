import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";
import type { msdyn_SearchResourceAvailabilityResponse as msdyn_SearchResourceAvailabilityResponseData } from "./types/index.js";

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
    // 204 No Content is an empty result
    if (response.status === 204) return msdyn_SearchResourceAvailabilityResponse.fromResponse({});
    return msdyn_SearchResourceAvailabilityResponse.fromResponse(await response.json());
  }
}

/**
 * msdyn_SearchResourceAvailability response message
 */
export class msdyn_SearchResourceAvailabilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_SearchResourceAvailabilityResponseData) {
    super("msdyn_SearchResourceAvailability");
  }

  static fromResponse(data: unknown): msdyn_SearchResourceAvailabilityResponse {
    return new msdyn_SearchResourceAvailabilityResponse(
      responseObject<msdyn_SearchResourceAvailabilityResponseData>(data)
    );
  }
}
