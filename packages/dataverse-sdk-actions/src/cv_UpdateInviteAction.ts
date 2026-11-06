import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "./types/EntityReference.js";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msfp_surveyinvite } from "./types/index.js";

/**
 * Response from the cv_UpdateInvite action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type cv_UpdateInviteResponse =
  | (msfp_surveyinvite & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

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
    // An entity output that wasn't set answers 204 No Content
    if (response.status === 204) return null;
    // The body is the record, with its annotations
    return (await response.json()) as cv_UpdateInviteResponse;
  }
}
