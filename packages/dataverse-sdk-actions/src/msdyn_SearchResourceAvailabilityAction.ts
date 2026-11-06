import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from msdyn_SearchResourceAvailability action
 */
export interface msdyn_SearchResourceAvailabilityResponse {}

/**
 * Parameters of the msdyn_SearchResourceAvailability action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface msdyn_SearchResourceAvailabilityActionParameters {
  Version?: string;
  IsWebApi?: boolean;
  Requirement: EntityReference | AnyEntityPayload;
  Settings: EntityReference | AnyEntityPayload;
  ResourceSpecification?: EntityReference | AnyEntityPayload;
}

/**
 * msdyn_SearchResourceAvailability action
 *
 * Unbound action
 */
export class msdyn_SearchResourceAvailabilityAction implements Executable<msdyn_SearchResourceAvailabilityResponse> {
  constructor(public readonly parameters: msdyn_SearchResourceAvailabilityActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/msdyn_SearchResourceAvailability`;

    const body = requestBody({
      Version: this.parameters.Version,
      IsWebApi: this.parameters.IsWebApi,
      Requirement: this.parameters.Requirement,
      Settings: this.parameters.Settings,
      ResourceSpecification: this.parameters.ResourceSpecification,
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
    if (response.status === 204) return {} as msdyn_SearchResourceAvailabilityResponse;
    return (await response.json()) as msdyn_SearchResourceAvailabilityResponse;
  }
}
