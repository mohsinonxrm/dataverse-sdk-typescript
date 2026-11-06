import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { socialprofile } from "./types/index.js";

/**
 * Response from GenerateSocialProfile action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface GenerateSocialProfileResponse extends socialprofile {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * Parameters of the GenerateSocialProfile action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateSocialProfileActionParameters {
  Entity: EntityReference | EntityPayload<socialprofile>;
}

/**
 * GenerateSocialProfile action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.socialprofile))
 */
export class GenerateSocialProfileAction implements Executable<GenerateSocialProfileResponse> {
  constructor(public readonly parameters: GenerateSocialProfileActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/socialprofiles/Microsoft.Dynamics.CRM.GenerateSocialProfile`;

    const body = requestBody({
      Entity: this.parameters.Entity,
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

  async parseResponse(response: Response): Promise<GenerateSocialProfileResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as GenerateSocialProfileResponse;
    return (await response.json()) as GenerateSocialProfileResponse;
  }
}
