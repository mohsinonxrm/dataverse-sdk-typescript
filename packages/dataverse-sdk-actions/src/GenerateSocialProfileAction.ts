import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
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
 * GenerateSocialProfile action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.socialprofile))
 */
export class GenerateSocialProfileAction implements Executable<GenerateSocialProfileResponse> {
  constructor(public readonly entity: EntityReference | EntityPayload<socialprofile>) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/socialprofiles/Microsoft.Dynamics.CRM.GenerateSocialProfile`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
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

  async parseResponse(response: Response): Promise<GenerateSocialProfileResponse> {
    const data = await response.json();
    return data as GenerateSocialProfileResponse;
  }
}
