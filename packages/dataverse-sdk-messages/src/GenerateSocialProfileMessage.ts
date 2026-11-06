import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { socialprofile } from "./types/index.js";

/**
 * GenerateSocialProfile request message
 *
 * Web API Action: GenerateSocialProfile
 */
export class GenerateSocialProfileRequest
  extends OrganizationRequest
  implements Executable<GenerateSocialProfileResponse>
{
  constructor(public entity: socialprofile) {
    super("GenerateSocialProfile");
  }

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
    return GenerateSocialProfileResponse.fromResponse(data);
  }

  toRequestBody(): Record<string, unknown> {
    return {
      Entity: this.entity,
    };
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
    return new GenerateSocialProfileResponse((data as any).value);
  }
}
