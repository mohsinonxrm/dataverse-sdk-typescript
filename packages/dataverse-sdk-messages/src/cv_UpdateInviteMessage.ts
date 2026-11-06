import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
import type { EntityPayload } from "./types/EntityPayload.js";
import type { msfp_surveyinvite } from "./types/index.js";

/**
 * cv_UpdateInvite request message
 *
 * Web API Action: cv_UpdateInvite
 */
export class cv_UpdateInviteRequest
  extends OrganizationRequest
  implements Executable<cv_UpdateInviteResponse>
{
  constructor(public inviteentity: EntityReference | EntityPayload<msfp_surveyinvite>) {
    super("cv_UpdateInvite");
  }

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
    return cv_UpdateInviteResponse.fromResponse(data);
  }
}

/**
 * cv_UpdateInvite response message
 */
export class cv_UpdateInviteResponse extends OrganizationResponse {
  constructor(public result: msfp_surveyinvite) {
    super("cv_UpdateInvite");
  }

  static fromResponse(data: unknown): cv_UpdateInviteResponse {
    return new cv_UpdateInviteResponse(responseObject<msfp_surveyinvite>(data));
  }
}
