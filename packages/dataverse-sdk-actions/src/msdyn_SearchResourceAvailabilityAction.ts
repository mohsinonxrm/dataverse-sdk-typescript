import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { AnyEntityPayload } from "./types/EntityPayload.js";

/**
 * Response from the msdyn_SearchResourceAvailability action.
 *
 * The response body itself, with its `@odata.context` (not wrapped in `value`).
 */
export interface msdyn_SearchResourceAvailabilityResponse {
  "@odata.context"?: string;
}

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
    // The body is the complex value, with its @odata.context
    return (await response.json()) as msdyn_SearchResourceAvailabilityResponse;
  }
}
