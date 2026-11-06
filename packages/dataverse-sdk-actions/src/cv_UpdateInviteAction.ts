import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { msfp_surveyinvite } from "./types/index.js";

/**
 * Response from cv_UpdateInvite action
 *
 * The response is the entity itself, not wrapped in `value`.
 */
export interface cv_UpdateInviteResponse extends msfp_surveyinvite {
  "@odata.context"?: string;
  "@odata.etag"?: string;
}

/**
 * cv_UpdateInvite action
 *
 * Unbound action
 */
export class cv_UpdateInviteAction implements Executable<cv_UpdateInviteResponse> {
  constructor(public readonly inviteentity: msfp_surveyinvite) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/cv_UpdateInvite`;

    const body: Record<string, unknown> = {
      inviteentity: this.inviteentity,
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

  async parseResponse(response: Response): Promise<cv_UpdateInviteResponse> {
    const data = await response.json();
    return data as cv_UpdateInviteResponse;
  }
}
