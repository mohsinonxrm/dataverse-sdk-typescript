import { OrganizationRequest, OrganizationResponse } from "./OrganizationRequest.js";
import type { Executable, RequestInformation } from "@mohsinonxrm/dataverse-sdk-core";
import { responseObject } from "./internal/responseData.js";
import type { EntityReference } from "./EntityReference.js";
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
    // 204 No Content is an empty result
    if (response.status === 204) return cv_UpdateInviteResponse.fromResponse({});
    return cv_UpdateInviteResponse.fromResponse(await response.json());
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
