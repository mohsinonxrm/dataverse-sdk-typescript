import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
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
    // 204 No Content (or an empty body) is an empty result
    const text = response.status === 204 ? "" : await response.text();
    return GenerateSocialProfileResponse.fromResponse(text ? JSON.parse(text) : {});
  }
}

/**
 * GenerateSocialProfile response message
 */
export class GenerateSocialProfileResponse extends OrganizationResponse {
  constructor(public result: socialprofile) {
    super("GenerateSocialProfile");
  }

  static fromResponse(data: unknown): GenerateSocialProfileResponse {
    return new GenerateSocialProfileResponse(responseObject<socialprofile>(data));
  }
}
