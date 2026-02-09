import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { socialprofile } from "./types/index.js";

/**
 * Response from GenerateSocialProfile action
 */
export interface GenerateSocialProfileResponse {
  value: socialprofile;
}

/**
 * GenerateSocialProfile action
 *
 * Bound action
 * Binding parameter: entityset (Collection(mscrm.socialprofile))
 */
export class GenerateSocialProfileAction implements Executable<GenerateSocialProfileResponse> {
  constructor(public readonly entity: socialprofile) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/GenerateSocialProfile`;

    const body: Record<string, unknown> = {
      Entity: this.entity,
    };

    return {
      method: "POST",
      url,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    };
  }

  async parseResponse(response: Response): Promise<GenerateSocialProfileResponse> {
    const data = await response.json();
    return data as GenerateSocialProfileResponse;
  }
}
