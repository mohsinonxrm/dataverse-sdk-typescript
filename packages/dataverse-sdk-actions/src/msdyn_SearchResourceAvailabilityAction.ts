import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SearchResourceAvailability action
 */
export interface msdyn_SearchResourceAvailabilityResponse {}

/**
 * msdyn_SearchResourceAvailability action
 *
 * Unbound action
 */
export class msdyn_SearchResourceAvailabilityAction implements Executable<msdyn_SearchResourceAvailabilityResponse> {
  constructor(
    public readonly version: string | undefined,
    public readonly isWebApi: boolean | undefined,
    public readonly requirement: EntityReference | AnyEntityPayload,
    public readonly settings: EntityReference | AnyEntityPayload,
    public readonly resourceSpecification?: EntityReference | AnyEntityPayload
  ) {}

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
    return data as msdyn_SearchResourceAvailabilityResponse;
  }
}
