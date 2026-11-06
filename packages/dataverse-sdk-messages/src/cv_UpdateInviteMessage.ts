import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import type { EntityReference } from "@mohsinonxrm/dataverse-sdk-entities-runtime";
import { requestBody } from "./internal/requestBody.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msfp_surveyinvite } from "./types/index.js";

/**
 * Parameters of the cv_UpdateInvite message, by their CSDL names. A parameter the CSDL declares
 * nullable is optional, and left out of the request when it's undefined.
 */
export interface cv_UpdateInviteRequestParameters {
  inviteentity: EntityReference | EntityPayload<msfp_surveyinvite>;
}

/**
 * cv_UpdateInvite request message
 *
 * Web API Action: cv_UpdateInvite
 */
export class cv_UpdateInviteRequest
  extends OrganizationRequest
  implements Executable<cv_UpdateInviteResponse>
{
  declare readonly Parameters: Readonly<cv_UpdateInviteRequestParameters>;

  constructor(parameters: cv_UpdateInviteRequestParameters) {
    super("cv_UpdateInvite", { ...parameters });
  }

  toRequestInformation(baseUrl: string): RequestInformation {
    const url = `${baseUrl}/cv_UpdateInvite`;

    const body = requestBody({
      inviteentity: this.Parameters.inviteentity,
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
    if (response.status === 204) return cv_UpdateInviteResponse.fromResponse(undefined);
    // The body is the record, with its annotations
    return cv_UpdateInviteResponse.fromResponse(await response.json());
  }
}

/**
 * Response from the cv_UpdateInvite action.
 *
 * The record: the response body itself, with its annotations (not wrapped in `value`).
 * `null` when the Web API answers 204 No Content (an entity output that wasn't set).
 */
export type cv_UpdateInviteResult =
  | (msfp_surveyinvite & {
      "@odata.context"?: string;
      "@odata.etag"?: string;
      "@odata.type"?: string;
    })
  | null;

/**
 * cv_UpdateInvite response message
 *
 * `result` is the value the cv_UpdateInvite action returns (see {@link cv_UpdateInviteResult}).
 */
export class cv_UpdateInviteResponse extends OrganizationResponse {
  constructor(public result: cv_UpdateInviteResult) {
    super("cv_UpdateInvite");
  }

  /** Read the result from a parsed response body (`undefined` for 204 No Content). */
  static fromResponse(data: unknown): cv_UpdateInviteResponse {
    return new cv_UpdateInviteResponse((data ?? null) as cv_UpdateInviteResult);
  }
}
