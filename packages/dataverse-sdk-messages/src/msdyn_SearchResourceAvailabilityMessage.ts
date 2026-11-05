import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./EntityReference.js";

/**
 * msdyn_SearchResourceAvailability request message
 *
 * Web API Action: msdyn_SearchResourceAvailability
 */
export class msdyn_SearchResourceAvailabilityRequest
  extends OrganizationRequest
  implements Executable<msdyn_SearchResourceAvailabilityResponse>
{
  constructor(
    public version: string,
    public isWebApi: boolean,
    public requirement: EntityReference,
    public settings: EntityReference,
    public resourceSpecification: EntityReference
  ) {
    super("msdyn_SearchResourceAvailability");
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SearchResourceAvailability`;

    const body: Record<string, unknown> = {
      Version: this.version,
      IsWebApi: this.isWebApi,
      Requirement: this.requirement,
      Settings: this.settings,
      ResourceSpecification: this.resourceSpecification,
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

  async parseResponse(response: Response): Promise<msdyn_SearchResourceAvailabilityResponse> {
    const data = await response.json();
    return msdyn_SearchResourceAvailabilityResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Version: this.version,
      IsWebApi: this.isWebApi,
      Requirement: this.requirement,
      Settings: this.settings,
      ResourceSpecification: this.resourceSpecification,
    };
  }
}

/**
 * msdyn_SearchResourceAvailability response message
 */
export class msdyn_SearchResourceAvailabilityResponse extends OrganizationResponse {
  constructor(public result: msdyn_SearchResourceAvailabilityResponse) {
    super("msdyn_SearchResourceAvailability");
  }

  static fromResponse(data: unknown): msdyn_SearchResourceAvailabilityResponse {
    return new msdyn_SearchResourceAvailabilityResponse((data as any).value);
  }
}
