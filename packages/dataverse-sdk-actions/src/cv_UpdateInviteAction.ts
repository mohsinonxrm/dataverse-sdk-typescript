import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
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
 * Parameters of the cv_UpdateInvite action, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface cv_UpdateInviteActionParameters {
  inviteentity: EntityReference | EntityPayload<msfp_surveyinvite>;
}

/**
 * cv_UpdateInvite action
 *
 * Unbound action
 */
export class cv_UpdateInviteAction implements Executable<cv_UpdateInviteResponse> {
  constructor(public readonly parameters: cv_UpdateInviteActionParameters) {}

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/cv_UpdateInvite`;

    const body = requestBody({
      inviteentity: this.parameters.inviteentity,
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

  async parseResponse(response: Response): Promise<cv_UpdateInviteResponse> {
    // 204 No Content is an empty result
    if (response.status === 204) return {} as cv_UpdateInviteResponse;
    return (await response.json()) as cv_UpdateInviteResponse;
  }
}
