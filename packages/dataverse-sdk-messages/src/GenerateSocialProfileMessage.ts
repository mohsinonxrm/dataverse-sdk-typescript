import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { socialprofile } from "./types/index.js";

/**
 * Parameters of the GenerateSocialProfile message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface GenerateSocialProfileRequestParameters {
  Entity: EntityReference | EntityPayload<socialprofile>;
}

/**
 * GenerateSocialProfile request message
 *
 * Web API Action: GenerateSocialProfile
 */
export class GenerateSocialProfileRequest
  extends OrganizationRequest
  implements Executable<GenerateSocialProfileResponse>
{
  declare readonly Parameters: Readonly<GenerateSocialProfileRequestParameters>;

  constructor(parameters: GenerateSocialProfileRequestParameters) {
    super("GenerateSocialProfile", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    // Bound action (entity collection)
    const url = `${baseUrl}/socialprofiles/Microsoft.Dynamics.CRM.GenerateSocialProfile`;

    const body = requestBody({
      Entity: this.Parameters.Entity,
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
    if (response.status === 204) return GenerateSocialProfileResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return GenerateSocialProfileResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the GenerateSocialProfile action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type GenerateSocialProfileResult =
  | (socialprofile & { "@odata.context"?: string; "@odata.etag"?: string; "@odata.type"?: string })
  | null;

/**
 * GenerateSocialProfile response message
 *
 * `result` is the value the GenerateSocialProfile action returns (see {@link GenerateSocialProfileResult}).
 */
export class GenerateSocialProfileResponse extends OrganizationResponse {
  constructor(public result: GenerateSocialProfileResult) {
    super("GenerateSocialProfile");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): GenerateSocialProfileResponse {
    return new GenerateSocialProfileResponse((data ?? null) as GenerateSocialProfileResult);
  }
}
