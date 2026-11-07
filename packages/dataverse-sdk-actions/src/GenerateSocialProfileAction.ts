import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { socialprofile } from "./types/index.js";

/**
 * Response from the GenerateSocialProfile action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GenerateSocialProfileResponse =
  | (socialprofile & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as GenerateSocialProfileResponse;
  }
}
